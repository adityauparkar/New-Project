import React from 'react';
import Styles from '../Login/styles'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import {Validations} from '../../validations'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.validations = new Validations();
        this.state = {
            fields: ['full_name', 'email', 'password', 'confirmPassword'],
            full_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false
        }
    }

    handleSignup = () => {
        let {full_name, email, password, confirmPassword} = this.state
        let errors
        this.state.fields.forEach((field)=>{
            let fieldValue = this.state[field]
            errors = this.validations.validate(field, fieldValue, password)
        })
        console.log(errors)
        this.setState({errors}, ()=>{
          if(!errors.full_name && !errors.email && !errors.password && !errors.confirmPassword){
            axios.post("/api/signup", {name: full_name, email, password, password2: confirmPassword})
        .then((res)=>{
            console.log(res.data)
            if(res.data.msg){
                this.setState({redirect: true})
            }
            else{
                if(res.data.errors){
                    this.setState({already_exists_error: res.data.errors})
                }
            }
        })
        .catch((err)=>{
            console.log(err.response)
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
            this.state.redirect ? <Redirect to="/login" /> : 
            <Styles>
            <div className="login-container">
                <div className="logo">
                    <img src="https://i.ibb.co/5sK5x7Q/csri-logo.jpg" />
                </div>
                <div className="title">
                    Create Account
                </div>
                <div className="fields-container">
                    <div className={`field ${this.state.errors && this.state.errors.full_name?"error":''}`}>
                        <div className="label">Organization Name</div>
                        <input name="full_name" onChange={this.handleInputChange} value={this.state.full_name} placeholder="Full Name" />
                        {this.state.errors && this.state.errors.full_name && <div className="error-msg">{this.state.errors.full_name}</div>}
                    </div>
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
                    <div className={`field ${this.state.errors && this.state.errors.confirmPassword?"error":''}`}>
                        <div className="label">Confirm Password</div>
                        <input type="password" name="confirmPassword" onChange={this.handleInputChange} value={this.state.confirmPassword} placeholder="Confirm Password" />
                        {this.state.errors && this.state.errors.confirmPassword && <div className="error-msg">{this.state.errors.confirmPassword}</div>}
                    </div>
                    </div>
        {this.state.already_exists_error && <div className="already-exists">{this.state.already_exists_error}</div>}
                    <div className="create-account-button" onClick={this.handleSignup}>
                        Create Account
                    </div>
                    <p className="already-account">
                        Already have an account? <Link to="/login">Log in here</Link>
                    </p>
                
            </div>
            </Styles>
        )
    }
}