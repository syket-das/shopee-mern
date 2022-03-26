const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  const message = `
    <h1 style="text-align:center;" >Thank you for your order!</h1>
  \n

  <h3 style="color: #0099ff;">Order Details</h3>
  <p>Order ID: ${order._id}</p>
  <p>Payment Status: ${order.paymentInfo.status}</p>
  <br />
  <h3>Total Price: ${order.totalPrice}</h3>

  <hr />

  ${orderItems.map((item) => {
    return `
      ${item.name} x ${item.quantity} = ${item.price * item.quantity}
      `;
  })}

  <hr />


  Thank you for shopping with us.
\n
  We will contact you soon.\n\n
  
  `;

  await sendEmail({
    email: req.user.email,
    subject: 'Shopee - Order Recieved',
    message,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  // console.log(orders);

  let totalAmount = 0;

  const paidOrders = orders.filter((order) => {
    if (order.paymentInfo.status === 'succeeded') {
      totalAmount += order.totalPrice;
      return order;
    }
  });

  // orders.forEach((order) => {
  //   totalAmount += order.totalPrice;
  // });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (req.body.paymentInfo && req.body.paymentInfo.status === 'succeeded') {
    order.paidAt = Date.now();
    order.paymentInfo.status = 'succeeded';
    await order.save({ validateBeforeSave: false });
  } else {
    if (order.orderStatus === 'Delivered') {
      return next(
        new ErrorHandler('You have already delivered this order', 400)
      );
    }

    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity, order);
    });

    (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());
    await order.save();
  }

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity, order) {
  const product = await Product.findById(id);
  if (
    order.orderStatus !== 'Processing' &&
    order.orderStatus !== 'Shipped' &&
    order.orderStatus === 'Delivered'
  ) {
    product.stock = product.stock - quantity;
  }

  await product.save({ validateBeforeSave: false });
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('No Order found with this ID', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
