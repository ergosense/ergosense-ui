import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { yup } from 'yup';

const styles = (theme) => ({
  iconTextField: {
    position: 'relative',
    paddingLeft: theme.spacing.unit * 4
  },
  iconTextFieldIcon: {
    position: 'absolute',
    left: 0,
    top: 26
  }
});

class IconTextField extends Component
{
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { ...this.state, error: false };
  }

  onBlur(e) {
    const { validation, parent } = this.props;

    validation.validate(e.target.value)
      .then(() => {
        this.setState({ error: false });
        parent.setState({ validationErrors: (parent.state.validationErrors || 0) - 1 });
      })
      .catch(err => {
        this.setState({ error: err });
        parent.setState({ validationErrors: (parent.state.validationErrors || 0) + 1 });
      });
  }

  onChange(e) {
    const { parent } = this.props;
    parent.handleInputChange(e);
  }

  render() {
    const { classes } = this.props;

    const iconColor = this.props.error ? 'error' : 'action';

    return (
      <React.Fragment>
        <div className={classes.iconTextField}>
          <div className={classes.iconTextFieldIcon}>
            {React.cloneElement(this.props.icon, { color: iconColor, style: { fontSize: 20 }})}
          </div>
          <TextField
            error={!!this.state.error}
            helperText={this.state.error && this.state.error.message}
            onBlur={this.onBlur}
            onChange={this.onChange}
            {...this.props}  />
        </div>
      </React.Fragment>
    );
  }
}

IconTextField.propTypes = {
  icon: PropTypes.element.isRequired
};

export default withStyles(styles)(IconTextField);