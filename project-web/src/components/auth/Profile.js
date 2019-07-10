import React, { Component } from 'react'
import courses from '../data/courses.json'
import campus from '../data/campus.json'
import authService from '../../services/AuthService'
import { withAuthConsumer } from '../../contexts/AuthStore.js';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const validations = {
  course: (value) => {
    let message;
    if (!value) {
      message = 'Course is required';
    }
    return message;
  },
  campus: (value) => {
    let message;
    if (!value) {
      message = 'Campus is required';
    }
    return message;
  }
}

class Profile extends Component {
  state = {
    user: {
      email: '',
      password: '',
      campus: campus[0],
      course: courses[0],
      avatarURL: 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png',
      avatar: ''
    },
    errors: {},
    touch: {}
  }

  handleChange = (event) => {
    const { name, value, files } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: files && files[0] ? files[0] : value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      authService.updateProfile(this.state.user)
        .then(
          (user) => this.setState({ user: {...this.state.user, ...user} }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                email: !errors && message
              }
            })
          }
        )
    }
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  handleLogout = () => {
    authService.logout()
      .then(() => this.props.onUserChange(null))
  }

  componentDidMount() {
    authService.getProfile()
      .then(
          (user) => this.setState({ user: {...this.state.user, ...user} }),
          (error) => console.error(error)
        )
  }

  render() {
    const { errors, user, touch } =  this.state;

    const campusOpts = campus.map(c => <option key={c} value={c}>{c}</option>)
    const courseOpts = courses.map(c => <option key={c} value={c}>{c}</option>)

    return (
      <div className="box mx-auto">
        <Link to="/products/new" className="btn btn-primary">New Product</Link>
        <div className="row">
          <i className="fa fa-sign-out btn-logout" onClick={this.handleLogout}></i>
          <div className="col-6">
            <h3>Profile</h3>
            <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={user.email} disabled/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                <div className="invalid-feedback">{ errors.password }</div>
              </div>
              <div className="form-group">
                <label>Campus</label>
                <select className={`form-control ${touch.campus && errors.campus ? 'is-invalid' : ''}`} name="campus" onChange={this.handleChange} onBlur={this.handleBlur} value={user.campus}>
                  {campusOpts}
                </select>
                <div className="invalid-feedback">{ errors.campus }</div>
              </div>
              <div className="form-group">
                <label>Course</label>
                <select className={`form-control ${touch.course && errors.course ? 'is-invalid' : ''}`} name="course" onChange={this.handleChange} onBlur={this.handleBlur} value={user.course}>
                  {courseOpts}
                </select>
                <div className="invalid-feedback">{ errors.course }</div>
              </div>
            </form>
          </div>
          <div className="col-6 pt-4">
            <label htmlFor="avatar" className="avatar"><img src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL} className="rounded mb-3" alt="Cinque Terre" /></label>
            <input type="file" id="avatar"  name="avatar" onChange={this.handleChange} />
            <button className="btn btn-white" form="profile-form" type="submit" disabled={!this.isValid()}>Update profile</button>
            <p className="mt-5"><small>This user is able to upload a new profile photo, using NodeJS and Multer uploader.</small></p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(Profile)