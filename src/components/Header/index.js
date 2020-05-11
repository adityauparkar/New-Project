import React from 'react'
import Styles from './styles'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: false,
      dropdown: false,
      navigator: true,
      redirect: false
    }
  }

  handleLogout = () => {
    axios.get("/api/logout")
    .then((res)=>{
      this.props.logout();
      this.setState({redirect: true})
    })
    .catch((err)=>{
      console.log(err.response)
    })
  }

  openSearchInput = () => {
    this.setState({ search: true })
  }
  closeSearchInput = () => {
    this.setState({ search: false })
  }
  render() {
    return (
      this.state.redirect ? <Redirect to="/login" /> : 
      <Styles>
        <div className="header-container">
          <div className="left-side">
            <div
              className={`logo-burger ${
                this.state.navigator ? '' : 'no-logo-burger'
              }`}
            >
              <div style={{ marginRight: 7 }}>
                <img
                  src="https://i.ibb.co/5sK5x7Q/csri-logo.jpg"
                  height="48px"
                />
              </div>
              <div
                className="hamburger-container"
                onClick={() => {
                  this.setState({ navigator: false })
                }}
              >
                <div className="strip"> </div>
                <div className="strip"> </div>
                <div className="strip"> </div>
              </div>
            </div>
            <div
              style={{
                display: this.state.navigator ? 'none' : 'block',
                cursor: 'pointer',
                marginRight: 48
              }}
            >
              <img
                src="https://i.ibb.co/R6JM7T7/letter-x.png"
                height="15px"
                onClick={() => {
                  this.setState({ navigator: true })
                }}
              />
            </div>
            <div
              className={`search-container ${
                this.state.search ? 'expandSearch' : 'shrinkSearch'
              }`}
            >
              <img
                src="https://i.ibb.co/R6JM7T7/letter-x.png"
                height="15px"
                onClick={this.closeSearchInput}
                className={`crossIcon ${
                  this.state.search ? 'slidingCross' : 'reverseSliding'
                }`}
              />
              <input
                placeholder="Type to search"
                className={this.state.search ? 'hop' : 'disappear'}
              />
              <div className="search-icon" onClick={this.openSearchInput}>
                <img
                  src="https://i.ibb.co/qgz5Q1G/search.png"
                  className={this.state.search ? 'rotateIcon' : 'antirotate'}
                  height="20px"
                  width="20px"
                />
              </div>
            </div>
          </div>
          <div className="right-side">
            <div
              className={`dropdown ${
                this.state.dropdown ? 'showDropdown' : ''
              }`}
              onBlur={() => {
                this.setState({ dropdown: false })
              }}
              tabIndex="2"
            >
              {['User Account', 'Settings', 'Actions'].map((ele, index) => {
                return (
                  <div className="clickable" key={index}>
                    {ele}
                  </div>
                )
              })}
              <div className="logout" onClick={this.handleLogout}>Logout</div>
            </div>
            <div style={{ marginRight: 8, borderRadius: '50%' }}>
              <img src="https://i.ibb.co/4478k32/csri-icon.png" width="42px" />
            </div>
            <div
              style={{ marginRight: 16, cursor: 'pointer' }}
              onClick={() => {
                this.setState({ dropdown: true })
              }}
            >
              <img
                src="https://i.ibb.co/CbZTBc6/down-arrow.png"
                height="10px"
              />
            </div>
            <div className="account-details">
            <div className="first-line">{this.props.user && this.props.user.name}</div>
              <div className="second-line">Admin Account</div>
            </div>
            <div>
              <img src="https://i.ibb.co/7Jc62nc/calendar.png" height="29px" />
            </div>
          </div>
        </div>
      </Styles>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, actions)(Header)