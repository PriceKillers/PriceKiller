import React from 'react';
import { connect } from 'react-redux';
import Favorites from './Favorites.js';
import { updateNotificationPref } from '../actions/notifications_a.jsx';

const style = {
  sidebar: {
      // height: '100%',
      // borderStyle: 'solid',
      // borderWidth: 'medium',
      borderColor: 'black',
      width: 0,
      maxWidth: '600px',
      position: 'absolute',
      zIndex: 100,
      // top: 0,
      // left: 0,
      backgroundColor: 'white',
      overflowX: 'hidden',
      padding: '0px',
      transition: '0.5s',
      opacity: 1
  },
  closebtn: {
    // fontSize: '36px',
    // marginLeft: '-20px'
  },
  profilePhoto: {
    borderRadius: '50%'
  }
}

const mapStateToProps = (state) => {
  return {
    notificationPref: state.userState.subscription,
    username: state.userState.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveNotifications: (username) => {
      dispatch(updateNotificationPref(true, username));
    },
    stopNotifications: (username) => {
      dispatch(updateNotificationPref(false, username));
    }
  }
}

const Sidebar = (props) => {
  let list;
  let name = localStorage.profile ? JSON.parse(localStorage.profile).given_name : null;
  let profilePhoto = localStorage.profile ? <img className="image is-128x128" style={style.profilePhoto} src={JSON.parse(localStorage.profile).picture} /> : <img className="image is-128x128" style={style.profilePhoto} src="https://s3-us-west-1.amazonaws.com/hackreactor27/default-avatar-ponsy-deer.png" />;
  //Remove duplicate photo
  profilePhoto = null;

  const toggleNav = () => {
    document.getElementById("sidenav").style.width = document.getElementById("sidenav").style.width === '100%' ? 0 : '100%';
  }

  if (props.sidebar.favorites) {
    if (props.sidebar.favorites.length === 0) {
      list = (
        <div>
          <header>No Stored Favorites</header>
        </div>
      );
    } else {
      list = (
        <Favorites />
      );
    }
  }

  let subYesInput;
  let subNoInput;
  if (props.notificationPref) {
    subYesInput = <input
                  type="radio"
                  name="subscription"
                  className="subYes"
                  checked
                  onChange={() => {props.receiveNotifications(props.username)}}
                />
    subNoInput = <input
                  type="radio"
                  name="subscription"
                  className="subNo"
                  onChange={() => {props.stopNotifications(props.username)}}
                />
  } else {
    subYesInput = <input
                  type="radio"
                  name="subscription"
                  className="subYes"
                  onChange={() => {props.receiveNotifications(props.username)}}
                />
    subNoInput = <input
                  type="radio"
                  name="subscription"
                  className="subNo"
                  checked
                  onChange={() => {props.stopNotifications(props.username)}}
                />
  }

  return (
    <div>
      <a className ="button is-1 is-info" style={style.closebtn}onClick={() => toggleNav()}><i className="fa fa-circle-o-notch" aria-hidden="true"></i></a>
      <div
        id="sidenav"
        className="card column is-1 is-narrow-mobile section"
        style={style.sidebar}
      >
        <p className="menu-label is-hidden-touch">Navigation</p>
        <a className="">
          <h3>Hello, {name}</h3>
          {profilePhoto}
        </a>
        <ul className="menu-list">
          <li>
            {list}
          </li>
          <li>
            <p>Subscription Preference</p>
            <div className="control">
              <label htmlFor="" className="radio">
                {subYesInput}
                Yes
              </label>
              <label htmlFor="" className="radio">
                {subNoInput}
                No
              </label>
            </div>
          </li>
          <li
            className="button is-1 is-info fa fa-sign-out"
            aria-hidden="true"
            onClick={() => {
              props.sidebar.auth.logout(); window.location.reload();
            }}
          >
          </li>
        </ul>
      </div>
  </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);