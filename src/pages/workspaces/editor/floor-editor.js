import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, List, ListItem, ListItemText, Button, Typography, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TweenLite, Power3 } from "gsap/all";
import PaperHeading from './../../../components/helper/paper-heading';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  zoom: {
    position: 'absolute',
    left: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2
  }
});

class FloorEditor extends Component {
  state =  {
    x: 0,
    y: 0,
    fixedX: 0,
    fixedY: 0,
    zoom: 1
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove(e) {
    if (this.state.dragging) {
      const { mouseX, mouseY } = this.state;

      const diffX = e.clientX - mouseX;
      const diffY = e.clientY - mouseY;

      console.log(diffX + ' - ' + diffY);

      this.setState({ x: this.state.fixedX + diffX, y: this.state.fixedY + diffY });
    }
  }

  getViewBox() {
    const svg = this.refs.editor;
    return svg.getAttribute('viewBox').split(' ');
  }

  setViewBox(minX, minY, width, height) {
    const svg = this.refs.editor;
    svg.setAttribute('viewBox', '' + minX + ' ' + minY + ' ' + width + ' ' + height);
  }

  onLoad(e) {
    console.log("LOAD!");

    // Set physical viewbox value
    const svg = this.refs.editor;
    const width = svg.width.baseVal.value;
    const height = svg.height.baseVal.value;

    // Without setting this, the animation won't work properly
    this.setViewBox(0, 0, width, height);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.zoom !== this.state.zoom) {
      this.animateZoom();
    }
  }

  animateZoom() {
    const svg = this.refs.editor;
    const width = svg.width.baseVal.value;
    const height = svg.height.baseVal.value;

    const viewBox = "0 0 " + (width / this.state.zoom) + " " + (height / this.state.zoom);

    var myAnimation = TweenLite.to(svg, 1, {
      attr: { viewBox: viewBox },
      ease: Power3.easeInOut
    });
  }


  increaseZoom() {
    this.setState({ zoom: this.state.zoom + 0.5 });
  }

  onMouseDown(e) {
    console.log('DOWN!')
    this.setState({
      dragging: true,
      mouseX: e.clientX,
      mouseY: e.clientY,
      fixedX: this.state.x,
      fixedY: this.state.y
    });
  }

  onMouseUp() {
    this.setState({ dragging: false });
  }

  render() {
    const { classes } = this.props;
    const { width, height, x, y } = this.state;

    return (
      <div className={ classes.container }>
        <svg
          onLoad={this.onLoad.bind(this)}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          width='100%'
          height='100%'
          xmlns="http://www.w3.org/2000/svg"
          ref='editor'>
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)"/>
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" strokeWidth="1"/>
            </pattern>
          </defs>

          <svg x={x} y={y} width={1447} height={1000}>
            <image xlinkHref="/plan1.jpg" x="0" y="0"/>
            <circle cx="200" cy="100" r="4" fill="red" />
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </svg>


        <Button
          variant="fab"
          onClick={this.increaseZoom.bind(this)}
          aria-label="Add"
          className={classes.zoom}>
          asd
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(FloorEditor);
