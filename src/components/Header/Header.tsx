import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {Avatar, Button, Col, Menu, Row} from "antd"
import {UserOutlined} from "@ant-design/icons"
import {Header} from "antd/es/layout/layout"

import {useDispatch, useSelector} from "react-redux"
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors"
import {logout} from "../../redux/auth-reducer"

import classes from './Header.module.css'

type PropsType = {}

const AppHeader: FC<PropsType> = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logout())
    }

    return (
        <>
            <Header className="header">
                <Row>
                    <Col span={18}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={6}>
                        {isAuth ? (
                            <Row>
                                <Col span={4}>
                                    <Avatar
                                        alt={login || ''}
                                        style={{backgroundColor: '#87d068'}}
                                        icon={<UserOutlined/>}/>
                                </Col>
                                <Col span={20}>
                                    <Button onClick={handleLogOut}>Log Out</Button>
                                </Col>
                            </Row>
                        ) : (
                            <Button>
                                <Link to={'/login'}>Login</Link>
                            </Button>
                        )}
                    </Col>
                </Row>
            </Header>
        </>
    )
}

export default AppHeader
