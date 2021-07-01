import React, {Component} from 'react'
import 'antd/dist/antd.css'
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import HeaderContainer from './components/Header/HeaderContainer'
import Footer from './components/Footer/Footer'
import SidebarContainer from './components/Sidebar/SidebarContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import NotFound from './components/NotFound/NotFound'
import LoginPage from './components/Login/Login'
import UsersContainer from './components/Users/UsersContainer'
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import './App.css'
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {compose} from "redux"
import store, {AppStateType} from "./redux/redux-store"
import {withSuspense} from "./hoc/withSuspense"
import classes from "./components/Sidebar/Sidebar.module.css";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: any) => {
        alert('some error')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors)
    }

    render() {
        const {SubMenu} = Menu
        const {Header, Content, Footer, Sider} = Layout

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                /*defaultSelectedKeys={['1']}*/
                                /*defaultOpenKeys={['sub1']}*/
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1">
                                        <Link to="/profile">Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/dialogs">Messages</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5">
                                        <Link to="/developers">Developers</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to='/profile' />}/>
                                <Route exact path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                                <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                                <Route path='/news' component={News}/>
                                <Route path='/music' component={Music}/>
                                <Route path='/settings' component={Settings}/>
                                <Route path='/developers' render={() => <UsersContainer pageTitle={"Samurai"} />}/>
                                <Route path='/login' render={() => <LoginPage/>}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            /*<div className="app-wrapper">
              <HeaderContainer/>
              {/!*<SidebarContainer/>*!/}
              <div className="app-wrapper__content">

              </div>
              <Footer/>
            </div>*/
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
    return (
        <Provider store={store}>
            {/*basename={process.env.PUBLIC_URL}*/}
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    )
}

export default SamuraiJSApp

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
