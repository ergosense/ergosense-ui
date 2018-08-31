import React from 'react';
import { Grid, Typography, Button, IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Layout from './../layouts'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  fab: {
    textAlign: 'right'
  }
});

const SitePage = (props) => {
  const { classes } = props;

  return (
    <Layout>
      <Grid item xs>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="headline" component="h2">
                Western Cape
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                <address>
                  1 Main Road<br/>
                  Bellville<br/>
                  Cape Town<br/>
                  5510
                </address>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton size="small">
              <EditIcon/>
            </IconButton>
            <IconButton size="small">
              <DeleteIcon/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>


      <Grid item xs={12} className={classes.fab}>
        <Button variant="fab" color="secondary" aria-label="Add">
          <EditIcon />
        </Button>
      </Grid>
    </Layout>
  );
};

export default withStyles(styles)(SitePage);
