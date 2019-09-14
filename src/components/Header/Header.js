import React from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src="https://3.img-dpreview.com/files/p/E~TS940x788~articles/shared/apple_sq.png" alt="Image"/>
    <div className={classes.loginBlock}>
    	{props.isAuth
            ? <div>{props.login} - <button className={classes.btn_logout} onClick={props.logout}>Log Out</button></div>
    		: <NavLink to={'/login'}>Login</NavLink>
    	}
    </div>
    </header>
  )
}

export default Header
