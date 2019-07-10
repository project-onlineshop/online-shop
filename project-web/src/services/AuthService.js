import http from './BaseService';

const register = user => http.post('/register', user)

const authenticate = credentials => http.post('/authenticate', credentials)

const getProfile = () => http.get('/profile')
  .then(res => Promise.resolve(res.data));


  const updateProfile = (user) => {
    const data = new FormData();
    Object.keys(user).forEach(prop => {
      if (prop === 'password' && user.password === '') return;
      data.append(prop, user[prop])
    });
    return http.put('/profile', data)
      .then(res => Promise.resolve(res.data));
  }

const logout = () => http.post('/logout')

export default {
    register,
    authenticate,
    logout,
    getProfile,
    updateProfile
}