import React from 'react'
import classes from './Sidebar.module.css'
import {NavLink} from 'react-router-dom'
import Friend from './Friend/Friend'
import Sidebar from './Sidebar'
import {connect} from 'react-redux'

let mapStateToProps = (state) => {
  let friendsTemplate = state.sidebar.friends.map(friend => <Friend key={friend.id} friendInfo={friend} />)

  return {
    friends: friendsTemplate
  }
}

const SidebarContainer = connect(mapStateToProps)(Sidebar);

export default SidebarContainer
