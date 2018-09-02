import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { submitting: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.isSubmitting = this.isSubmitting.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleBlur() {
    //noop
  }

  release() {
    this.setState({ submitting: false });
  }

  isSubmitting() {
    return this.state.submitting;
  }
}