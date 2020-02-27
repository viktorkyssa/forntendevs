import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

import classes from './Header.module.css'

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: FC<PropsType> = ({isAuth, login, logout}) => {
  return (
    <header className={classes.header}>
      <img src="https://3.img-dpreview.com/files/p/E~TS940x788~articles/shared/apple_sq.png" alt="Logo"/>
      <div className={classes.loginBlock}>
          {isAuth ? (
                  <div>
                    {login} - <button className={classes.btn_logout} onClick={logout}>Log Out</button>
                  </div>
              ) : (
                  <NavLink to={'/login'}>Login</NavLink>
              )
          }
      </div>
    </header>
  )
}

export default Header
