import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const styles = theme => ({
  table: {}
});

class Tree extends Component {

  static propTypes = {
    items: PropTypes.array
  }

  item = 0;

  state = {
    open: []
  }

  open(element) {
    let open = this.state.open;

    if (open.includes(element.id)) {
      open = open.filter(i => i !== element.id);
    } else {
      open.push(element.id);
    }

    this.setState({ open: Array.from(new Set(open)) });
  }

  mapChildren(element) {
    let child = 0;

    return (
      <Collapse in={this.state.open.includes(element.id)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {element.children.map(i => this.renderNode(i))}
        </List>
      </Collapse>
    );
  }

  renderNode(element) {
    return (
      <React.Fragment key={`item-${this.item++}`}>
        <ListItem button divider={true} onClick={() => this.open.bind(this)(element)}>
          <ListItemText primary={element.name}/>
          {element.children && (this.state.open.includes(element.id) ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {element.children && this.mapChildren.bind(this)(element)}
      </React.Fragment>
    );
  }

  render() {
    const { classes, items } = this.props;

    return (
      <List>
        {items.map(i => this.renderNode.bind(this)(i))}
      </List>
    );
  }
};

export default withStyles(styles)(Tree);