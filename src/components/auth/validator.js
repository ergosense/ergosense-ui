/*
 | Custom validation
 | -----------------
 | Validation wrapper. Exposes certain common form
 | methods and wraps them with validation calls. This component
 | should be used as a helper to reduce boiler plate in form elements.
 */
export default class Validator
{
  constructor(props) {
    this.props = props;

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.blur = this.blur.bind(this);
    this.validate = this.validate.bind(this);
    this.getInputs = this.getInputs.bind(this);
  }

  getInputs() {
    return this.props.inputs || this.props.parent.state;
  }

  validate() {
    return this.props.validation.validate(this.getInputs(), { abortEarly: false, context: this.props.context || {}})
      .then(() => ({}))
      .catch((err) => this.reduceErrors(err))
      .then((errors) => {
        this.props.onError({ errors: errors });
        return errors;
      });
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

    if (this.props.onSubmitStatus) this.props.onSubmitStatus({ submitting: true });

    this.validate()
      .then((errors) => {
        const success = !Object.keys(errors).length;

        // Release the "submitting" statue if errors were found
        if (this.props.onSubmitStatus && !success) this.props.onSubmitStatus({ submitting: false });

        // Forward call to original submit method
        if (this.props.onSubmit && success) this.props.onSubmit(e);
      });

  }
}

export const validator = (props) => {
  return new Validator(props);
}