import React from "react";

const ProductDescription = () => {
  return (
    <>
    <div className="mt-20 ">
      <div className="flex gap-3 mb-4">
        <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36">
          Description
        </button>
        <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">
          Care Guide
        </button>
        <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">
          Size Guide
        </button>
      </div>
      <div className=" flex flex-col pb-16">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          natus veniam accusamus a error repellendus, consectetur odio maiores
          doloribus consequuntur id laudantium commodi labore ex asperiores
          quasi esse itaque! Ex, quae odit inventore laborum, facilis omnis
          aliquid earum, mollitia quod ipsa vitae distinctio repellendus
          aperiam! Ex asperiores repudiandae at culpa.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quam
          assumenda sint facere ullam temporibus enim, illo iure optio, autem
          cupiditate repellat natus incidunt animi eius libero quos!
        </p>
      </div>
      </div>
    </>
  );
};

export default ProductDescription;
