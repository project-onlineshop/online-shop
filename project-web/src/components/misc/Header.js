import React from 'react'
import { Link } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
import '../../App.css';

const Header = (props) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
    {/* <div className="container"> */}
      <Link className="navbar-brand" to="/">SellBy</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        </ul>
        <ul className="navbar-nav my-2 my-lg-0">
          
          {!props.isAuthenticated() && (
            <li className="nav-item">
              <Link className="navbar-brand" to="/login">Login</Link>
            </li>
          )}

          {props.isAuthenticated() && (
            <li className="nav-item">
              <Link to="/profile">{props.user.email}</Link>
            </li>
          )}
          
        </ul>
      </div>
    {/* </div> */}
  </nav>
)


export default withAuthConsumer(Header)