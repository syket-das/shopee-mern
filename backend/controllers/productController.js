const Product = require('../models/product');
const {
  PutObjectCommand,

  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { s3Client } = require('../config/spaceConfig');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const docs = req.files.images;

  let imagesLinks = [];

  for (let i = 0; i < docs.length; i++) {
    const bucketParams = {
      Bucket: process.env.SPACE_NAME,
      Key: `products/${Date.now() + '-' + docs[i].name}`,
      Body: docs[i].data,
      ACL: 'public-read',
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(bucketParams));
    } catch (err) {
      const data = await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.SPACE_NAME,
          Key: bucketParams.Key,
        })
      );
      return next(new ErrorHandler(err.message, 500));
    }

    imagesLinks.push({
      public_id: bucketParams.Key,
      url: `https://shopee.nyc3.digitaloceanspaces.com/${bucketParams.Key}`,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  // const product = await Product.create(req.body);

  // res.status(201).json({
  //   success: true,
  //   product,
  // });

  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    imagesLinks.forEach(async (image) => {
      const data = await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.SPACE_NAME,
          Key: image.public_id,
        })
      );
    });

    return next(new ErrorHandler(err.message, 500));
  }
});

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 12;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
});

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  let images = [];

  // if (req.files.images) {
  //   images = req.files.images;
  //   // Deleting images associated with the product
  //   for (let i = 0; i < product.images.length; i++) {
  //     const image_id = product.images[i].public_id;
  //     const data = await s3Client.send(
  //       new DeleteObjectCommand({
  //         Bucket: process.env.SPACE_NAME,
  //         Key: image_id,
  //       })
  //     );
  //   }

  //   let imagesLinks = [];

  //   for (let i = 0; i < images.length; i++) {
  //     const bucketParams = {
  //       Bucket: process.env.SPACE_NAME,
  //       Key: `products/${Date.now() + '-' + images[i].name}`,
  //       Body: images[i].data,
  //       ACL: 'public-read',
  //     };

  //     try {
  //       const data = await s3Client.send(new PutObjectCommand(bucketParams));
  //     } catch (err) {
  //       const data = await s3Client.send(
  //         new DeleteObjectCommand({
  //           Bucket: process.env.SPACE_NAME,
  //           Key: bucketParams.Key,
  //         })
  //       );
  //       return next(new ErrorHandler(err.message, 500));
  //     }

  //     imagesLinks.push({
  //       public_id: bucketParams.Key,
  //       url: `https://shopee.nyc3.digitaloceanspaces.com/${bucketParams.Key}`,
  //     });
  //   }

  //   req.body.images = imagesLinks;
  // }

  //   product = await Product.findByIdAndUpdate(req.params, req.body, {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   });

  //   res.status(200).json({
  //     success: true,
  //     product,
  //   });

  try {
    if (req.files?.images) {
      images = req.files.images;
      // Deleting images associated with the product
      for (let i = 0; i < product.images.length; i++) {
        const image_id = product.images[i].public_id;
        const data = await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.SPACE_NAME,
            Key: image_id,
          })
        );
      }

      let imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const bucketParams = {
          Bucket: process.env.SPACE_NAME,
          Key: `products/${Date.now() + '-' + images[i].name}`,
          Body: images[i].data,
          ACL: 'public-read',
        };

        try {
          const data = await s3Client.send(new PutObjectCommand(bucketParams));
        } catch (err) {
          const data = await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.SPACE_NAME,
              Key: bucketParams.Key,
            })
          );
          return next(new ErrorHandler(err.message, 500));
        }

        imagesLinks.push({
          public_id: bucketParams.Key,
          url: `https://shopee.nyc3.digitaloceanspaces.com/${bucketParams.Key}`,
        });
      }

      req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const image_id = product.images[i].public_id;
    const data = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.SPACE_NAME,
        Key: image_id,
      })
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product is deleted.',
  });
});

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
