import React from 'react'
import {connect} from 'react-redux'

import Friend from './Friend/Friend'
import Sidebar from './Sidebar'

let mapStateToProps = (state) => {
  let friendsTemplate = state.sidebar.friends.map(friend => <Friend key={friend.id} friendInfo={friend} />)

  return {
    friends: friendsTemplate
  }
}

const SidebarContainer = connect(mapStateToProps)(Sidebar);

export default SidebarContainer
