import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from './select'

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  //handle change
  handleChange = (event) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(event.target);
    if (errorMessage) errors[event.target.name] = errorMessage;
    else delete errors[event.target.name];

    const data = this.state.data;
    data[event.target.name] = event.target.value;
    this.setState({ data, errors });
  };

  //handle submit event
  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });
    if (errors) return;
    this.doSubmit(event);
  };

  //validate
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  //validate property
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  //render button
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  //render select
  renderSelect(name,label,options){
    const {data,errors} = this.state
    return(
      <Select 
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  //render Input
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
