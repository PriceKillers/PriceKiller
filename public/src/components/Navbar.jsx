import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { setUserState, userLogout, showSearchResults } from '../actions/main_a.jsx';
import { setFavorites } from '../actions/favorites_a';
import Signup from './Signup.jsx';
import Search from './Search.jsx';
import Favorites from './Favorites';
import WhoWeAre from './WhoWeAre.jsx';
import GettingStarted from './GettingStarted.jsx';
import Notifications from './Notifications.jsx';
import Sidebar from './Sidebar.jsx';
import Auth0 from "auth0-lock";
import Auth from "../../../Auth/Auth.js";
import axios from 'axios';
const Lock = require('../../../Auth/Auth.js').lock;

import { Route, Link, Redirect } from 'react-router-dom';
const auth = new Auth;

const mapStateToProps = (state) => {
  return {
    userState: state.userState,
    favorites: state.favorites.favorites,
    auth: auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserState: (user) => {
      dispatch(setUserState(user))
    },
    userLogout: () => {
      dispatch(userLogout())
    },
    setFavorites: (favorites) => {
      dispatch(setFavorites(favorites))
    },
    hideSearchResults: () => {
      dispatch(showSearchResults(false));
    },
    allowSearchResults: () => {
      dispatch(showSearchResults(true));
    }
  }
}

class Navbar extends Component {

  componentWillMount() {
    setTimeout(function(){
      if (auth.isAuthenticated()) {

        let localProfile = JSON.parse(localStorage.getItem('profile'));
      }
      if (!auth.isAuthenticated()) {
        console.log(Date.now())
        Lock.show();
      }
    }, 1000)
  }

  componentDidMount() {
    // debugger;
    let self = this;
    auth.handleAuthentication().then(({data}) => {
      // console.log('PLEASE ====>', data)
      self.props.setUserState(data); 
      self.props.setFavorites(data.favorites);
      // axios.get(`/api/auth/signup/${JSON.parse(localStorage.getItem('profile')).email}`)
      //   .then((res) => {
      //     console.log(res.body);
      // })
    })

    Lock.on('authorization_error', function(error) {
      console.log('authorization_error', error);
    });
  }

  activateModal(e) {
    e.preventDefault();
    $('.modal').addClass('is-active')
  }

  activateMenu(e) {
    $('.navbar-menu').toggleClass('is-active')
  }


  render() {
    // let self = this;
    const style = {
      hamburger: {
        float: 'left',
        width: '10%'
        // position: 'absolute',
        // bottom: 0
      },
      picture: {
        // position: 'absolute',
        // bottom: 0,
        borderRadius: '50%',
        float: 'left'
      },
      logoContainer: {
        float: 'left',
        width: '30%',
      },
      logo: {
        maxWidth: '200px',
        width: '100%'
      },
      spacer: {
        padding: '10%'
      },
      container: {
        display: 'flex',
        alignItems: 'center'
      }
    }
    let profilePhoto = localStorage.profile ? <div className=""><img className="image is-96x96 navbar-item" src={JSON.parse(localStorage.profile).picture} style={style.picture}/></div> : null;
    return(
      <div>
        <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand" style={style.container}>
            <div className="" style={style.hamburger}>
              <button
                className="button navbar-burger"
                data-target="navbarExampleTransparentExample"
                onClick={(e) => {this.activateMenu(e)}}
                style={style.hamburger}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div style={style.spacer}></div>
            <div style={style.logoContainer}>
              <Link to="/">
                <img src="https://s3-us-west-1.amazonaws.com/hackreactor27/pricekiller_logov1.png" style={style.logo} height="100%" alt="Pricekiller, kill your prices"/>
              </Link>
            </div>
            <div style={style.spacer}></div>
            {profilePhoto}
          </div>

          <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <div>
              <Link
                className="navbar-item"
                to="/">
                Home
              </Link>
              <div className="navbar-item has-dropdown is-hoverable">
                <Link
                  className="navbar-link"
                  to="/"
                  onClick={(e) => {this.activateMenu(e)}}
                >
                  Navigation
                </Link>
                <div className="navbar-dropdown is-boxed">

                  <Link
                    className="navbar-item"
                    to="/chart"
                    onClick={(e) => {
                      this.activateMenu(e);
                      this.props.hideSearchResults();
                      document.getElementById("sidenav").style.width = 0;
                    }}
                  >
                    Chart
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/GettingStarted"
                    onClick={(e) => {
                      this.activateMenu(e)
                      this.props.hideSearchResults();
                      document.getElementById("sidenav").style.width = 0;
                    }}
                  >
                    Getting Started
                  </Link>
                   <Link
                    className="navbar-item"
                    to="/WhoWeAre"
                    onClick={(e) => {
                      this.activateMenu(e);
                      this.props.hideSearchResults();
                      document.getElementById("sidenav").style.width = 0;
                    }}
                  >
                    Who We Are
                  </Link>
                  <hr className="navbar-divider"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </nav>
        <hr/>
      </div>
      <Notifications/>
      <Sidebar
        sidebar={this.props}
      />
    </div>
    )
  }
}

Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default Navbar;
