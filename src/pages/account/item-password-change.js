import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';

import { LoadingButton } from './../../components/auth';
import ChangePassword from './../../components/dialog/change-password';
import ConfigItem from './../../components/helper/config-item';

const styles = theme => ({
  wrapper: {
    margin: 0
  }
});

class ItemPasswordChange extends Component {
  state = {
    open: false,
    enabled: false,
    submitting: false,
    initialized: false
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.error = this.error.bind(this);
    this.success = this.success.bind(this);
    this.progress = this.progress.bind(this);

    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({ initialized: true });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  error(err) {
    if (!this._mounted) return;
    // TODO dispatch global error
    console.log(err);

    // Invert the checked status, basically "resetting" it
    this.setState({ submitting: false });
    this.close();
  }

  success() {
    if (!this._mounted) return;
    // We assume the correct status has already been set
    // by the "on change" handler
    this.close();
    this.setState({ submitting: false });
  }

  progress() {
    if (!this._mounted) return;
    this.setState({ submitting: true });
  }

  open() {
    if (!this._mounted) return;
    this.setState({ open: true });
  }

  close() {
    if (!this._mounted) return;
    this.setState({ open: false });
  }

  render() {
    const { last, user, classes } = this.props;

    return (
      <React.Fragment>
        <ConfigItem
          laste={last}
          primary={I18n.get('Account password')}
          secondary="**********"
          actions={() =>
            <LoadingButton
              classes={{ wrapper: classes.wrapper }}
              variant="text"
              color="default"
              size="small"
              onClick={this.open}
              disabled={this.state.submitting || !this.state.initialized}
              submitting={this.state.submitting}>
              {I18n.get('Change')}
            </LoadingButton>
          }/>

        {/* Change password dialog */}
        <ChangePassword
          user={user}
          open={this.state.open || false}
          onClose={this.close}
          onProgress={this.progress}
          onSuccess={this.success}
          onError={this.error}/>
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(ItemPasswordChange);
