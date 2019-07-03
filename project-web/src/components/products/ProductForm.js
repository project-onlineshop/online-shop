import React from 'react';
import FormField from '../misc/FormField';
import ProductService from '../../services/ProductsService'
import { Redirect } from 'react-router-dom'

const validators = {
  title: value => value.length > 3,
  attachment: value => value.length > 10,
  message: value => value.length > 3
}

class ProductForm extends React.Component {
  state = {
    data: {
      title: '',
      message: '',
      attachment: ''
    },
    errors: {
      title: true,
      message: true,
      attachment: true
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

  render () {
    if (this.state.goToProducts) {
      return <Redirect to="/products"/>
    }

    const { data, errors, touch } = this.state

    const hasErrors = Object.values(errors).some(el => el === true)

    return (
      <article className="ProductForm">

        <form onSubmit={this.handleSubmit}>
          <FormField
            label="Title"
            name="title"
            onBlur={this.handleBlur}
            value={data.title}
            onChange={this.handleChange}
            touch={touch.title}
            error={errors.title}
            inputType="text"
            validationClassName={this.getValidationClassName('title')} />
          
          <FormField
            label="Attachment"
            name="attachment"
            onBlur={this.handleBlur}
            value={data.attachment}
            onChange={this.handleChange}
            touch={touch.attachment}
            error={errors.attachment}
            inputType="text"
            validationClassName={this.getValidationClassName('attachment')} />
          
          <FormField
            label="Message"
            name="message"
            onBlur={this.handleBlur}
            value={data.message}
            onChange={this.handleChange}
            touch={touch.message}
            error={errors.message}
            inputType="textarea"
            validationClassName={this.getValidationClassName('message')} />
        
          <button type="submit"
            className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
            disabled={hasErrors}>Submit</button>
        </form>
      </article>
    )
  }
}

export default ProductForm