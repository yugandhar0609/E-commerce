import React, { useContext, useState } from "react";

import Product_rt_1 from "../../assets/product_rt_1.png";
import Product_rt_2 from "../../assets/product_rt_2.png";
import Product_rt_3 from "../../assets/product_rt_3.png";
import Product_rt_4 from "../../assets/product_rt_4.png";
import { MdStar } from "react-icons/md";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const [mainImage, setMainImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const {addToCart}=useContext(ShopContext)

  const sizes = ["S", "M", "L", "XL"];

  return (
    <>
      <div className="flex flex-col gap-14 xl:flex-row">
        {/* left side */}
        <div className="flex gap-x-2 xl:flex-1">
          <div className="flex flex-col gap-[7px] flex-wrap">
            <img
              src={Product_rt_1}
              alt="ProductImage"
              className="max-h-[99px] cursor-pointer"
              onClick={() => setMainImage(Product_rt_1)}
            />
            <img
              src={Product_rt_2}
              alt="ProductImage"
              className="max-h-[99px] cursor-pointer"
              onClick={() => setMainImage(Product_rt_2)}
            />
            <img
              src={Product_rt_3}
              alt="ProductImage"
              className="max-h-[99px] cursor-pointer"
              onClick={() => setMainImage(Product_rt_3)}
            />
            <img
              src={Product_rt_4}
              alt="ProductImage"
              className="max-h-[99px] cursor-pointer"
              onClick={() => setMainImage(Product_rt_4)}
            />
          </div>
          <div className="xl:flex-1">
            <img src={mainImage} alt={product.name} className="w-full h-auto" />
          </div>
        </div>
        {/* right side */}
        <div className="flex-col flex xl:flex-[1.7]">
          <h3 className="h3">{product.name}</h3>
          <div className="flex gap-x-2 text-secondary medium-22">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <p>(111)</p>
          </div>
          <div className="flex gap-x-6 medium-20 my-4">
            <div className="line-through ">{product.old_price}</div>
            <div className="text-secondary">{product.new_price}</div>
          </div>
         
          <div className="mb-4">
            <h4>Select size</h4>
          </div>
          <div className="flex gap-4 my-3 ">
            {sizes.map((size) => (
              <div
                key={size}
                className={`ring-2 h-10 w-10 flexCenter cursor-pointer ${
                  selectedSize === size
                    ? "ring-slate-900"
                    : "ring-slate-900/10"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
            <button onClick={()=>{addToCart(product.id)}} className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest">Add to cart</button>
            <button className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest">Buy now</button>
          </div>
          <p>
            <span>
              Category: <span className="medium-16 text-tertiary">Women | Jacket | Winter</span>
            </span>
          </p>
          <p>
            <span>
              Tags: <span className="medium-16 text-tertiary">Modern | Latest</span>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
