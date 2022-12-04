import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { Card } from 'react-bootstrap';

const CardSkeleton = () => {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Skeleton height={250} />
        <Card.Body>
          <Skeleton height={20} />
          <Skeleton height={20} />

          <Card.Text as="div">
            <Skeleton height={60} />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardSkeleton;
