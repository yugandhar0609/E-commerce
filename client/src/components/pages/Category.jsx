import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import all_products from "../../assets/all_products";
import Items from "./Items";

const Category = ({ category, banner }) => {
  return (
    <div className="max_padd_container py-12 xl:py-28">
      <div>
        <div>
          <img src={banner} alt="Banner" className="block my-7 mx-auto" />
        </div>
      </div>
      <div className="flexBetween my-8 mx-2">
        <h5>
          <span className="font-bold">showing 1-12</span> out of 36 products
        </h5>
        <div className="flecBetween max-sm:p-4 gap-x-4 px-8 py-3 rounded ring-1 ring-slate-900/15 ">
          sort by <MdOutlineKeyboardArrowDown />
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {all_products.map((item) => {
          if (category === item.category) {
            return (
              <Items
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                old_price={`$${item.old_price}`}
                new_price={`$${item.new_price}`}
              />
            );
          }
        })}
      </div>
      <div className="text-center mt-16">
        <button className="btn_dark_rounded ">Load More</button>
      </div>
    </div>

  );
};

export default Category;
