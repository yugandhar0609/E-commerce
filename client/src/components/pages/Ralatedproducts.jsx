import React from 'react'
import Items from './Items'
import POPULAR from '../../assets/popular'

const Ralatedproducts = () => {
  return (
    <div>
       <div className="bg-white">
      <div className="max_padd_container py-12 xl:py-28 xl:w-[88%] mx-auto">
        <h1 className="h3 text-center">Ralated Products</h1>
        <hr className="h-[3px] w-3/4 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-black to-transparent mb-12" />
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {POPULAR.map((item) => (
            <Items
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              old_price={`$${item.old_price}`}
              new_price={`$${item.new_price}`}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Ralatedproducts
