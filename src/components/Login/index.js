import React from 'react';
import Styles from './styles'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import {Validations} from '../../validations'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.validations = new Validations();
        this.state = {
            fields: ['email', 'password'],
            email: '',
            password: '',
            redirect: false
        }
    }

    handleLogin = () => {
        let {email, password} = this.state
        let errors
        this.state.fields.forEach((field)=>{
            let fieldValue = this.state[field]
            errors = this.validations.validate(field, fieldValue)
        })
        console.log(errors)
        this.setState({errors}, ()=>{
          if(!errors.email && !errors.password){
        axios.post("/api/login", {email, password})
        .then((res)=>{
            console.log(res.data)
            if(res.data && res.data.user){
                this.props.login(res.data.user)
                this.setState({redirect: true})
            }
        })
        .catch((err)=>{
            console.log(err.response)
            if(err.response && err.response.status==401){
                this.setState({invalid: true})
            }
        })
    }
})
    }

    handleInputChange = (e) => {
        let errors = Object.assign({}, this.state.errors, {[e.target.name]: null})
        this.setState({
            [e.target.name]: e.target.value,
            errors
        })
    }

    render(){
        return(
            this.state.redirect ? <Redirect to="/dashboard" /> : 
            <Styles>
            <div className="login-container">
                <div className="logo">
                    <img src="https://i.ibb.co/5sK5x7Q/csri-logo.jpg" />
                </div>
                <div className="title">
                Login in to your account
                </div>
                <div className="fields-container">
                <div className={`field ${this.state.errors && this.state.errors.email?"error":''}`}>
                        <div className="label">Email Address</div>
                        <input name="email" onChange={this.handleInputChange} value={this.state.email} placeholder="Email Address" />
                        {this.state.errors && this.state.errors.email && <div className="error-msg">{this.state.errors.email}</div>}
                    </div>
                    <div className={`field ${this.state.errors && this.state.errors.password?"error":''}`}>
                        <div className="label">Password</div>
                        <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password" />
                        {this.state.errors && this.state.errors.password && <div className="error-msg">{this.state.errors.password}</div>}
                    </div>
                    </div>
                    {this.state.invalid && <div className="already-exists">Invalid email or password</div>}
                    <div className="create-account-button" onClick={this.handleLogin}>
                        Sign in
                    </div>
                    <p className="already-account">
                    Don't you have a CSRI account?  <Link to="/signup">Signup here</Link>
                    </p>
                
            </div>
            </Styles>
        )
    }
}

export default connect(null, actions)(Login)