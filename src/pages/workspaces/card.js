import React from 'react';
import { I18n } from 'aws-amplify';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, CardActionArea, Typography, CardActions, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Business } from '@material-ui/icons';

const styles = (theme) => ({
  media: {
    height: 140,
  },
  content: {
    width: '100%'
  }
});

const formatContent = (content, classes) => {
  let iter = 0;

  return (
    <Typography color="textSecondary" component="div">
      {content.split(',').map(i => {
        return (
          <React.Fragment key={`content-${iter++}`}>
            {i}<br/>
          </React.Fragment>
        );
      })}
    </Typography>
  );
}

const HelperCard = ({ classes, title, content, onClick }) => {
  return (
    <Card>
      <CardActionArea classes={{ root: classes.content }} onClick={onClick}>
        <CardMedia
          className={classes.media}
          image="https://propertywheel.co.za/wp-content/uploads/direct/Willowbridge-Place.jpg"
          title="Contemplative Reptile"/>
        <CardContent>
          <Typography gutterBottom variant="headline">
            {title}
          </Typography>
          {formatContent(content, classes)}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">
          {I18n.get('Delete')}
        </Button>
        <Button size="small" color="primary" onClick={onClick}>
          {I18n.get('Manage')}
        </Button>
      </CardActions>
    </Card>
  );
};

HelperCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(HelperCard);