import React, { Component } from 'react'
import ProductsList from './ProductsList';
import Favourites from './Favourites'

class ProductsFavs extends Component{

    state = {
        favouriteProducts: []
    }

    addToFavourite = (product) => {
        this.setState({
            favouriteProducts: [product, ...this.state.favouriteProducts]
        })
      }

    render() {


        return(
            <div>
                <ProductsList addToFavourite={this.addToFavourite} />
                <div>
                <Favourites products={this.state.favouriteProducts} />
                </div>

            </div>
        )
    }
}

export default ProductsFavs