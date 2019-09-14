import React from 'react'
import classes from './Sidebar.module.css'
import {NavLink} from 'react-router-dom'

const Sidebar = (props) => {

  return (
          <div className={classes.sidebar}>
            <ul className={classes.nav}>
              <li className={classes.item}><NavLink exact to="/profile" activeClassName={classes.active}>Profile</NavLink></li>
              <li className={classes.item}><NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink></li>
              <li className={classes.item}><NavLink to="/news" activeClassName={classes.active}>News</NavLink></li>
              <li className={classes.item}><NavLink to="/music" activeClassName={classes.active}>Music</NavLink></li>
              <li className={classes.item}><NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink></li>
              <li className={classes.item}><NavLink to="/users" activeClassName={classes.active}>Users</NavLink></li>
            </ul>
            <ul className={classes.friends}>
              {props.friends}
            </ul>
          </div>
  )
}

export default Sidebar
