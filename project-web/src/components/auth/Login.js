import React from 'react';
import FormField from '../misc/FormField';
import AuthService from '../../services/AuthService';
import { Redirect } from 'react-router-dom'
import { withAuthContext } from '../../contexts/AuthStore';

const validators = {
    email: v => v.length > 0,
    password: v => v.length >8
}

class Login extends React.Component {
    
    state = {
        data: {
            email: '',
            password: ''
        },
        errors: {
            email: true,
            password: true
        },
        touch: {},
        goToHome: false,
        wrongCredentials: false
    }

    handleChange = (event) => {
        const { name, value } = event.target;
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
        } else if (errors[attr]){
            return 'is-invalid'
        } else {
            return 'is-valid'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        AuthService.authenticate(this.state.data).then(
            (response) => {
                this.setState({ goToHome: true })
                this.props.onUserChange(response.data)
            },
            error => {
                this.setState({
                    wrongCredentials: true,
                    errors : {
                        ...this.state.errors,
                        email: true,
                        password: true
                    }
                })
            }
        )
    }

    render(){
        const { data, errors, touch } = this.state

        const hasErrors = Object.values(errors).some(el => el === true)

        if (this.state.goToHome){
            return <Redirect to = "/"/>
        }

        return (
            <form className="login" onSubmit={this.handleSubmit}>
      
              {this.state.wrongCredentials && (
                <div className="alert alert-danger" role="alert">
                  wrong credentials
                </div>)
              }
      
              <FormField
                label="email"
                name="email"
                onBlur={this.handleBlur}
                value={data.email}
                onChange={this.handleChange}
                touch={touch.email}
                error={errors.email}
                inputType="text"
                validationClassName={this.getValidationClassName('email')} />
              
              <FormField
                label="password"
                name="password"
                onBlur={this.handleBlur}
                value={data.password}
                onChange={this.handleChange}
                touch={touch.password}
                error={errors.password}
                inputType="password"
                validationClassName={this.getValidationClassName('password')} />
      
              <button type="submit"
                className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
                disabled={hasErrors}>Submit</button>
            </form>
          )
        }
      }
      
      export default withAuthContext(Login)