import React from "react";
import { TbArrowRight } from "react-icons/tb";

const ProductHd = () => {
  const { product } = props;
  return (
    <>
      <div>
        Home <TbArrowRight /> shop <TbArrowRight /> {product.category}{" "}
        <TbArrowRight /> {product.name}
      </div>
    </>
  );
};

export default ProductHd;
