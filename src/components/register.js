import React from "react";
import Form from "./common/Form";
import Joi from 'joi-browser'
import * as userService from '../services/userService'
import auth from '../services/authService'
class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Name")
  };
  
  doSubmit = async () => {
    let res
    try{
      res = await userService.register(this.state.data)
      auth.loginWithJwt(res.headers['x-auth-token'])
      //localStorage.setItem("token",res.headers['x-auth-token'])
      window.location = '/'
    }catch(ex){
      if(ex.response && ex.response.status ===400){
        const errors = {...this.state.errors}
        errors.username = ex.response.data
        this.setState({errors})
      }
    }
    console.log("Submitted.");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderInput("name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
