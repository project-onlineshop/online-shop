import React from 'react';
import FormField from '../misc/FormField';
import AuthService from '../../services/AuthService';
import { Redirect } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

// export default function TextFields() {
//     const classes = useStyles();
//     const [values, setValues] = React.useState({
//       name: 'Cat in the Hat',
//       age: '',
//       multiline: 'Controlled',
//       currency: 'EUR',
//     });

const validators = {
    email: v => v.length > 0,
    password: v => v.length > 8
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
        } else if (errors[attr]) {
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
                this.props.onUserChange(response)
            },
            error => {
                this.setState({
                    wrongCredentials: true,
                    errors: {
                        ...this.state.errors,
                        email: true,
                        password: true
                    }
                })
            }
        )
    }

    render() {
        const { data, errors, touch } = this.state

        const hasErrors = Object.values(errors).some(el => el === true)

        if (this.state.goToHome) {
            return <Redirect to="/" />
        }

        return (
            <div className="row justify-content-md-center login">
                <form className="login" onSubmit={this.handleSubmit}>

                    {this.state.wrongCredentials && (
                        <div className="alert alert-danger" role="alert">
                            Wrong credentials
                        </div>)
                    }

                    {/* <FormField
                        label="email"
                        name="email"
                        onBlur={this.handleBlur}
                        value={data.email}
                        onChange={this.handleChange}
                        touch={touch.email}
                        error={errors.email}
                        inputType="text"
                        validationClassName={this.getValidationClassName('email')} /> */}

                    <TextField
                        label="email"
                        id="standard-dense"
                        name="email"
                        margin="dense"
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
                    <div className="row">
                        If you are not already register, go to <Link to="/register"> &nbsp;Register</Link>
                    </div>
                </form>


            </div>


        )
    }
}

export default withAuthConsumer(Login)