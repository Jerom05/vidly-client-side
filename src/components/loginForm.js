import "bootstrap/dist/css/bootstrap.css";
import Joi from "joi-browser";
import React from "react";
import Form from "./common/Form";
import auth from '../services/authService'

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };
  
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  };

  doSubmit = async() => {
    try{
      const {data} = this.state
      await auth.login(data.username, data.password)
      //localStorage.setItem("token",res.data)
      //console.log('login form: login information', res.data)
      window.location = '/'
    }
    
    catch(ex){
      const errors = {...this.state.errors}
      if(ex.response && ex.response.status===400){
        errors.username = ex.response.data
        this.setState({errors})
      }
    }
    console.log("Submitted.");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username','Username')}
          {this.renderInput('password','Password','password')}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;


























































/*
//validate
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if(!result.error) return null
    const errors ={}
    for(let item of result.error.details){
      
    }
    console.log(result);
    const errors = {};
    const { data } = this.state;
    if (data.username.trim() === "")
      errors.username = "username is required";
    if (data.password.trim() === "")
      errors.password = "password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };
 */

//validate property
//   validateProperty = ({ name, value }) => {
//     if (name === "username") {
//       if (this.state.data.username.trim() === "")
//         return "username is required";
//     }
//     if (name === "password") {
//       if (this.state.data.password.trim() === "")
//         return "password is required";
//     }
//   };
// }
