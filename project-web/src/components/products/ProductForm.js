import React from 'react';
import FormField from '../misc/FormField';
import ProductService from '../../services/ProductsService'
import { Redirect } from 'react-router-dom'

const validators = {
  name: value => value.length > 3,
  category: value => value.length > 3,
  description: value => value.length > 10,
  price: value => Number.isInteger(+value),
  image: value => value.length > 20
}

class ProductForm extends React.Component {
  state = {
    data: {
      name: '',
      description: '',
      category: '',
      price: '',
      image: ''
    },
    errors: {
      name: true,
      description: true,
      category: true,
      price: true,
      image: true
    },
    goToProducts: false,
    touch: {}
  }

  handleChange = (event) => {
    const { name, value } = event.target
    const isValid = validators[name](value)

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: !isValid
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target

    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  getValidationClassName = (attr) => {
    const { errors, touch } = this.state

    if (!touch[attr]) {
      return ''
    } else if (errors[attr]) {
      return 'is-invalid'
    } else {
      return 'is-valid'
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    ProductService.createProduct(this.state.data).then(
      () => {
        this.setState({ goToProducts: true })
      },
      error => {
        // Advanced way to show server errors in the form!

        const serverErrors = Object.keys(error.response.data.errors).reduce((acc, el) => (
          { ...acc, [el]: true }
        ), {})

        this.setState({
          errors: {
            ...this.state.errors,
            ...serverErrors
          }
        })
      }
    )
  }

  render() {
    if (this.state.goToProducts) {
      return <Redirect to="/products" />
    }

    const { data, errors, touch } = this.state

    const hasErrors = Object.values(errors).some(el => el === true)

    return (
      <article className="ProductForm">

        <form onSubmit={this.handleSubmit}>
          <FormField
            label="Name"
            name="name"
            onBlur={this.handleBlur}
            value={data.name}
            onChange={this.handleChange}
            touch={touch.name}
            error={errors.name}
            inputType="text"
            validationClassName={this.getValidationClassName('name')} />

          <FormField
            label="Category"
            name="category"
            onBlur={this.handleBlur}
            value={data.category}
            onChange={this.handleChange}
            touch={touch.category}
            error={errors.category}
            inputType="text"
            validationClassName={this.getValidationClassName('category')} />

          <FormField
            label="Price"
            name="price"
            onBlur={this.handleBlur}
            value={data.price}
            onChange={this.handleChange}
            touch={touch.price}
            error={errors.price}
            inputType="text"
            validationClassName={this.getValidationClassName('price')} />

          <FormField
            label="Image"
            name="image"
            onBlur={this.handleBlur}
            value={data.image}
            onChange={this.handleChange}
            touch={touch.image}
            error={errors.image}
            inputType="text"
            validationClassName={this.getValidationClassName('image')} />

          <FormField
            label="Description"
            name="description"
            onBlur={this.handleBlur}
            value={data.description}
            onChange={this.handleChange}
            touch={touch.description}
            error={errors.description}
            inputType="textarea"
            validationClassName={this.getValidationClassName('description')} />

          <button type="submit"
            className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
            disabled={hasErrors}>Submit</button>
        </form>
      </article>
    )
  }
}

export default ProductForm