import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import Login from '../../components/login'
import Register from '../../components/Register'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

class Auth extends React.Component {
    state = {
    }
    render() {
        const { auth, location } = this.props

        let redirectPath = '/'
        if (location.state) redirectPath = location.state.from.pathname

        if (auth.isLoggedIn && !auth.loading) {
            this.props.history.push(redirectPath)
        }

        return (
            <div className="main-wrapper">
                <Header />
                <div id="content-wrapper">
                    <section id="login">
                        <input type='checkbox' id='form-switch' defaultChecked={this.props.checked} />
                        <Login />
                        <Register />
                    </section>
                </div>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { auth } = state
    return {
        auth
    }
}

export default connect(mapStateToProps)(Auth)