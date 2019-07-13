import React from 'react'
import Product from './Product';

const Favourites = ({ products }) => {
  return (
    <div className="Favourites">
      <h4>Favourite products</h4>

      <div className="row">
        {products.map((elem, index) =>(
          <div className="col-12 mb-4" key={index}>
            <Product product={elem} isFavourite/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites