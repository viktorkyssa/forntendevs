import React, {Component} from 'react'
import HeaderContainer from './components/Header/HeaderContainer'
import Footer from './components/Footer/Footer'
import SidebarContainer from './components/Sidebar/SidebarContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import NotFound from './components/NotFound/NotFound'
import LoginPage from './components/Login/Login'
import UsersContainer from './components/Users/UsersContainer'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import './App.css'
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {compose} from "redux"
import store from "./redux/redux-store"
import {withSuspense} from "./hoc/withSuspense"

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends Component {

  catchAllUnhandledErrors = (reason, promise) => {
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
    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
        <div className="app-wrapper">
          <HeaderContainer/>
          <SidebarContainer/>
          <div className="app-wrapper__content">
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/profile' />}/>
              <Route exact path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
              <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
              <Route path='/news' component={News}/>
              <Route path='/music' component={Music}/>
              <Route path='/settings' component={Settings}/>
              <Route path='/users' render={() => <UsersContainer/>}/>
              <Route path='/login' render={() => <LoginPage/>}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp = (props) => {
    return (
        <Provider store={store}>
            {/*basename={process.env.PUBLIC_URL}*/}
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </Provider>
    )
}

export default SamuraiJSApp
