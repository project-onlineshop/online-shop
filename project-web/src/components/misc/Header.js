import React from 'react'
import { Link } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';

const Header = (props) => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <div className="container">
      <Link className="navbar-brand" to="/">Iron-wallapop</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <ul class="navbar-nav my-2 my-lg-0">
          
          {!props.isAuthenticated() && (
            <li class="nav-item">
              <Link className="navbar-brand" to="/login">Login</Link>
            </li>
          )}

          {props.isAuthenticated() && (
            <li class="nav-item">
              <a class="nav-link disabled" href="javascript:;">{props.user.email}</a>
            </li>
          )}
          
        </ul>
      </div>
    </div>
  </nav>
)


export default withAuthConsumer(Header)