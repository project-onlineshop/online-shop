import http from './BaseService';

const getProducts = () => http.get('/products')

const getProductsById = (id) => http.get(`/products/${id}`)
.then(res => res.data)

const deleteProduct = id => http.delete(`/products/${id}`)

const createProduct = product => http.post(`/products`, product)

const createFavourite = id => http.post(`/toggle-favourite/${id}`)

export default {
    getProducts,
    deleteProduct,
    createProduct,
    getProductsById,
    createFavourite
}