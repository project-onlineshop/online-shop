import React from 'react'
import Product from './Product';

const Favourites = ({ episodes }) => {
  return (
    <div className="Favourites">
      <h4>Favourite Episodes</h4>

      <div className="row">
        {episodes.map((e, i) =>(
          <div className="col-12 mb-4" key={i}>
            <Product episode={e} isFavourite/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites