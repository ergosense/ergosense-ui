import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, List, ListItem, ListItemText, Button, Typography, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TweenLite, Power3 } from "gsap/all";
import PaperHeading from './../../../components/helper/paper-heading';

import Sensor, { ActiveSensor } from './graphics/sensor';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  zoom: {
    position: 'absolute',
    left: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2
  }
});

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class FloorEditor extends Component {
  state =  {
    selected: null,
    dragging: null,
    panning: { top: 0, left: 0 },
    panningCaptured: null,
    mouseCaptured: null,
    sensors: []
  };

  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

    // Resize listener
    window.addEventListener("resize", this.resizeWindow.bind(this));

    // TEMP
    this.setState({ sensors: [ new Sensor(200, 200), new ActiveSensor(300, 300, true) ] });

    // TEMP
    this.drawCanvas();
  }

  componentWillUnmount() {
    const canvas = this.refs.canvas;
    canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));

    // Deregister the resize listener
    window.removeEventListener("resize", this.resizeWindow.bind(this));
  }

  onMouseMove(e) {
    let sensor;
    let panningCaptured;

    if (sensor = this.state.dragging) {
      sensor.x = (e.offsetX - (e.offsetX % 20));
      sensor.y = (e.offsetY - (e.offsetY % 20));
    }

    if (panningCaptured = this.state.panningCaptured) {
      let { x, y } = this.state.mouseCaptured;
      console.log(panningCaptured);

      console.log(e.offsetX + ' ' + e.offsetY);
      x = e.clientX - x;
      y = e.clientY - y;

      console.log('x' + x + ' y ' + y);
      console.log(this.state.panning);
      this.setState({ panning: { left: panningCaptured.x + x, top: panningCaptured.y + y } });
    }
  }

  resizeWindow() {
    console.log('resize');
    this.drawCanvas();
  }

  drawCanvas() {
    if (!this.state.panning) return;

    const canvas = this.refs.canvas;
    const container = this.refs.container;

    const w = container.clientWidth;
    const h = container.clientHeight;
    const scale = 2;
    const space = 10 * scale;
    let x = 0;
    let y = 0;


    // Draw the image
    const img = new Image;

    // Wait for the floorplan to load before we draw the grid
    img.onload = () => {
      // Set the canvas w/h
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);

      // Create 2D context
      const context = canvas.getContext('2d');

      // Clear context
      context.clearRect(0, 0, w, h);

      // Draw the floor plan
      context.drawImage(img, 0, 0);

      while (y < h) {
        y = y + space;
        context.beginPath();

        context.moveTo(0.5, y + 0.5);
        context.lineTo(w + 0.5, y + 0.5);

        // Set grid colour
        context.strokeStyle = "#ccc";
        context.lineWidth = 1;

        context.stroke();
        context.closePath();
      }

      while (x < w) {
        x = x + space;
        context.beginPath();

        context.moveTo(x + 0.5, 0.5);
        context.lineTo(x + 0.5, h + 0.5);

        // Set grid colour
        context.strokeStyle = "#ccc";
        context.lineWidth = 1;

        context.stroke();
        context.closePath();
      }

      // Draw circles
      this.state.sensors.forEach(sensor => sensor.draw(context));
    }

    // Set the floorplan source, this will start loading the image
    // in the background.
    img.src ='/plan1.jpg';

    requestAnimationFrame(this.drawCanvas.bind(this));
  }

  onClick(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const sensor = this.state.sensors.find(i => {
      return i.match(x, y);
    });

    this.setState({ selected: sensor });
  }

  onMouseDown(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const sensor = this.state.sensors.find(i => {
      return i.match(x, y);
    });

    this.setState({ mouseCaptured: { x: e.clientX, y: e.clientY } });
    this.setState({ panningCaptured: !sensor ? { x: this.refs.canvas.offsetLeft, y: this.refs.canvas.offsetTop } : false });
    this.setState({ dragging: sensor });
  }

  onMouseUp(e) {
    this.setState({ dragging: null, panningCaptured: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={ classes.container } ref='container'>
        <canvas
          ref='canvas'
          className={ classes.canvas }
          onClick={this.onClick.bind(this)}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onMouseLeave={this.onMouseUp.bind(this)}
          style={{ ...this.state.panning }}>
        </canvas>
      </div>
    );
  }
}

export default withStyles(styles)(FloorEditor);
