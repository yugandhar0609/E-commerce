import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { TbTrash } from "react-icons/tb";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalAmount, addToCart } =
    useContext(ShopContext);

  if (!products || products.length === 0) {
    return <p>No products in cart.</p>;
  }

  return (
    <section className="max_padd_container pt-8 md:pt-28">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mx-auto bg-white shadow-md rounded my-6 overflow-hidden">
          <thead>
            <tr className="bg-slate-900/10 text-xs md:text-sm lg:text-base text-start py-2 md:py-3 lg:py-4">
              <th className="py-2 px-3 text-left">Product</th>
              <th className="py-2 px-3 ">Title</th>
              <th className="py-2 px-3 text-center">Price</th>
              <th className="py-2 px-3 text-center">Quantity</th>
              <th className="py-2 px-3 text-center">Total</th>
              <th className="py-2 px-3 text-center hidden md:table-cell">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs md:text-sm lg:text-base font-light">
            {products.map((product) => {
              if (cartItems[product.id] > 0) {
                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 text-center hover:bg-gray-100"
                  >
                    <td className="py-2 px-3 text-left">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt="Product"
                          className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded"
                        />
                      </div>
                    </td>
                    <td>
                      <span className="ml-2 md:hidden block overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[60%]">
                        {product.name.length > 15
                          ? product.name.slice(0, 10) + "..."
                          : product.name}
                      </span>
                      <span className="ml-2 md:block hidden">
                        {product.name}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-center">
                      ${product.new_price}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none px-1 md:px-2"
                        >
                          -
                        </button>
                        <span className="mx-1 md:mx-2">
                          {cartItems[product.id]}
                        </span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none px-1 md:px-2"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      ${(product.new_price * cartItems[product.id]).toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-center hidden md:table-cell">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs md:text-sm lg:text-base bg-red-500 hover:bg-red-600 text-white py-1 px-2 md:py-2 md:px-3 rounded"
                      >
                        <TbTrash />
                      </button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 md:gap-20 my-8 md:my-16 p-4 md:p-8 md:flex-row rounded-md bg-white w-full max-w-[666px] mx-auto md:max-w-[1440px]">
        <div className="flex flex-col gap-4 md:gap-10 w-full">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Summary</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm md:text-base">Subtotal:</h4>
              <h4 className="font-semibold text-gray-700 text-sm md:text-base">
                ${getTotalAmount()}
              </h4>
            </div>
            <hr className="md:hidden" />
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm md:text-base">
                Shipping Fee:
              </h4>
              <h4 className="font-semibold text-gray-700 text-sm md:text-base">
                Free
              </h4>
            </div>
            <hr className="md:hidden" />
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base md:text-lg lg:text-xl">
                Total:
              </h4>
              <h4 className="font-bold text-base md:text-lg lg:text-xl">
                ${getTotalAmount()}
              </h4>
            </div>
          </div>
          <button className="btn_dark_rounded w-full md:w-44 self-center">
            Checkout
          </button>
          <div className="flex flex-col gap-4 md:gap-10">
            <h4 className="font-bold text-base md:text-lg capitalize">
              Enter Your Coupon Code:
            </h4>
            <div className="flex items-center bg-primary rounded-full ring-1 ring-slate-900/10 p-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="bg-transparent border-none outline-none flex-grow ml-3"
              />
              <button className="btn_dark_rounded  md: -ml-3">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItems;
