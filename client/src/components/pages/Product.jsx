import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductHd from "./ProductHd";
import ProductDisplay from './ProductDisplay';

const Product = () => {
  const { contextvalue } = useContext(ShopContext);
  const { productId } = useParams();
  const product = contextvalue.find((e) => e.id === Number(productId));
  if (!product) {
    return <div>Products not found!</div>;
  }
  return (
    <>
      <section>
        <div>
          <ProductHd  product={product}/>
          <ProductDisplay product={product}/>
        </div>
      </section>
    </>
  );
};

export default Product;
