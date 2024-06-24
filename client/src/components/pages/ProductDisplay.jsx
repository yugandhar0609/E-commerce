import React from "react";

import { Product_rt_1 } from '../../assets/Product_rt_1.png'



const ProductDisplay = () => {
  return (
    <>
      <div>
        <div>
          <div>
            <img
              src={Product_rt_1}
              alt="ProductImage"
              className="max-h-[99px]"
            />
            <img
              src={Product_rt_2}
              alt="ProductImage"
              className="max-h-[99px]"
            />
            <img
              src={Product_rt_3}
              alt="ProductImage"
              className="max-h-[99px]"
            />
            <img
              src={Product_rt_4}
              alt="ProductImage"
              className="max-h-[99px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
