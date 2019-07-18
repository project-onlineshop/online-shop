import React from 'react'
import Product from './Product';

const Favourites = ({ products }) => {
  return (
    <div className="Favourites">
      <h3>Favourite products</h3>

      <div className="row">
        {products.map((e, i) =>(
          <div className="col-12 mb-4" key={i}>
            <Product product={e} isFavourite/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites