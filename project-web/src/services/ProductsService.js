import http from './BaseService';

const getProducts = () => http.get('/products')

const deleteProduct = id => http.delete(`/products/${id}`)

const createProduct = product => http.post(`/products`, product)

export default {
    getProducts,
    deleteProduct,
    createProduct
}