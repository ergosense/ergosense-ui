import React from 'react';
import { I18n } from '@aws-amplify/core';
import { SignIn as AmplifySignIn} from 'aws-amplify-react';
import { TextField, Button, Grid } from '@material-ui/core';
import Form from './../form'

class SignIn extends Form
{
  render() {
    return (
      <form>
        <TextField
          error={false}
          helperText={''}
          label="Email"
          name="email"
          onChange={this.handleSubmit}
          onBlur={this.handleSubmit}
          value={''}
          margin="normal"
          fullWidth
          />

        <TextField
          error={false}
          helperText={false}
          type="password"
          label="Password"
          name="password"
          onChange={this.handleSubmit}
          onBlur={this.handleSubmit}
          value={''}
          margin="normal"
          fullWidth
          />

        <br/><br/><br/>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={this.isSubmitting()}>
          Sign in
        </Button>
      </form>
    );
  }
}

export default SignIn;