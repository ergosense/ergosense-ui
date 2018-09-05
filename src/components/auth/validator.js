import React from 'react';

export default class Validator
{
  constructor(props) {
    this.props = props;

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.blur = this.blur.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    return this.props.validation.validate(this.props.inputs, { abortEarly: false, context: this.props.context || {}})
      .then(() => ({}))
      .catch((err) => this.reduceErrors(err))
      .then((errors) => {
        this.props.onError({ errors: errors });
        return errors;
      });;
  }

  reduceErrors(err) {
    return err.inner.reduce((carry, current) => {
      return { ...carry, [current.path]: current.message };
    }, {});
  }

  change(e) {
    if (this.props.onChange) this.props.onChange(e);
  }

  blur(e) {
    this.validate()
      .then(() => {
        // Forward call to original blur method
        if (this.props.onBlur) this.props.onBlur(e);
      });
  }

  submit(e) {
    e.preventDefault();
    console.log('what');
    if (this.props.onSubmitStatus) this.props.onSubmitStatus({ submitting: true });

    this.validate()
      .then((errors) => {
        const success = !Object.keys(errors).length;
        console.log(success);
        // Release the "submitting" statue if errors were found
        if (this.props.onSubmitStatus && !success) this.props.onSubmitStatus({ submitting: false });

        // Forward call to original submit method
        if (this.props.onSubmit && success) this.props.onSubmit(e);
      });

  }
}