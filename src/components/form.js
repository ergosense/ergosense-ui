import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { submitting: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.isSubmitting = this.isSubmitting.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isSubmitting() {
    return this.state.submitting;
  }
}