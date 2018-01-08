import React from 'react';

let style = {
  background: {
    backgroundImage: `url('https://s3-us-west-1.amazonaws.com/hackreactor27/who_we_are.jpg')`
  },
  card: {
    margin: '0 auto',
    width: '50%',
    minWidth: '500px',
    height: '50%'
  },
  credits: {
    textAlign: 'center'
  },
  diagram: {
    margin: '10px 10px'
  }
}

export default class WhoWeAre extends React.Component {
  render(){
    return (
      <div style={style.background}>
        <div className="card" style={style.card}>
          <div className="card-content" style={style.credits}>
            <p className="title">
              Who We Are
            </p>
            <ul>
              <li><a href="https://www.linkedin.com/in/brian-binder912"><strong>Brian Binder</strong></a> - Project Manager - bbinder912@gmail.com - <a href="https://github.com/pray4mojo"><i className="fa fa-github" aria-hidden="true"></i></a></li>
              <li><a href="https://www.linkedin.com/in/yazhikarman"><strong>Yazhi Karman</strong></a> - Scrum Master - dyazhi@gmail.com - <a href="https://github.com/yazhik12"><i className="fa fa-github" aria-hidden="true"></i></a></li>
              <li><strong>Luke Garner</strong> - Lead Engineer - lukegarner.ca@gmail.com - <a href="https://github.com/elgeesound"><i className="fa fa-github" aria-hidden="true"></i></a></li>
            </ul>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                This is an open source project <a href="https://github.com/PriceKillers">PriceKiller</a>
              </span>
            </p>
          </footer>
        </div>
         <div className="card" style={style.card}>
          <div className="card-content" style={style.credits}>
            <p className="title is-3">
              PriceKiller runs on the following technologies:
            </p>
            <div style={style.diagram}>
              <img src="https://s3-us-west-1.amazonaws.com/hackreactor27/Tech+Stack+(1).jpg"/>
            </div>
          </div>
        </div>
      </div>
      )
  }
}
