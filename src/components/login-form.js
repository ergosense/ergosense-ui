import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { TextField, Button, Grid } from '@material-ui/core';
import { withFormik } from 'formik';
import { login } from './../actions';
import api from './../api';
import loginValidation from './../validations/login'

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  user
}) => (
  <form onSubmit={handleSubmit}>
    <TextField
      error={!!touched.email && !!errors.email}
      helperText={touched.email && errors.email ? errors.email : ''}
      label="Email"
      name="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      margin="normal"
      fullWidth
      />

    {user}
    <TextField
      error={!!touched.password && !!errors.password}
      helperText={touched.password && errors.password ? errors.password : ''}
      type="password"
      label="Password"
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
      margin="normal"
      fullWidth
      />

    <br/><br/><br/>

    <Button
      fullWidth
      type="submit"
      variant="contained"
      color="primary"
      disabled={isSubmitting}>
      Sign in
    </Button>
  </form>
);

const handleSubmit = (values, { props, setSubmitting, setErrors }) => {
  setSubmitting(true);

  api.login()
    .then(jwt => {
      setSubmitting(false);
      props.dispatch(login(jwt));
      props.dispatch(push('/'));
    })
    .catch(err => {
      console.log(err);
      setSubmitting(false);
    });
};

const formik = withFormik({
  mapPropsToValues: props => ({ email: '', password: '', user: null }),
  handleSubmit: handleSubmit,
  validationSchema: loginValidation
})(LoginForm);

const mapStateToProps = (state, ownProps) => {
  return { ...state.login, ...ownProps }
};

export default connect(mapStateToProps)(formik);