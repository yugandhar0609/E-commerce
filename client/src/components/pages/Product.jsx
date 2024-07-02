import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductHd from "./ProductHd";
import ProductDisplay from "./ProductDisplay";
import ProductDescription from "./ProductDescription";
import Ralatedproducts from "./Ralatedproducts";


const Product = () => {
  const { products } = useContext(ShopContext); 
  const { productId } = useParams();

  // Add a check to ensure products is defined
  if (!products) {
    return <div>Loading...</div>;
  }

  const product = products.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <section>
      <div className="max_padd_container py-20">
        <ProductHd product={product} />
        <ProductDisplay product={product} />
        <ProductDescription />
        <Ralatedproducts/>
      </div>
    </section>
  );
};

export default Product;
