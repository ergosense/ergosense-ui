import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const styles = theme => ({});

const AlertDialog = (props) => {
  const { open, title, content, onDisagree, onAgree } = props;

  return (
    <Dialog
      open={open}
      onClose={onDisagree}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree}>
          Disagree
        </Button>
        <Button onClick={onAgree} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AlertDialog);
