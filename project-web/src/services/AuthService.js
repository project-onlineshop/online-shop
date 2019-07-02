import http from './BaseService';

const register = user => http.post('/register', user)

const authenticate = credentials => http.post('/authenticate', credentials)

const logout = () => http.post('/logout')

export default {
    register,
    authenticate,
    logout
}