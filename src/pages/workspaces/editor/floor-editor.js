import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, List, ListItem, ListItemText, Button, Typography, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TweenLite, Power3 } from "gsap/all";
import PaperHeading from './../../../components/helper/paper-heading';

import { Scrollbars} from 'react-custom-scrollbars';
import Sensor from './graphics/sensor';
import Grid from './graphics/grid';
import Plan from './graphics/plan';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'auto'
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
    width: 0,
    height: 0,
    dragging: null,
    selected: null,
    cursor: 'default'
  };

  /**
   * Sensors aren't in "state", because we will
   * manipulate them directly and push changes as a
   * bulk update. This variable represents the "living"
   * state as work is being done, not the "original" state
   * which should be available via props.sensors
   */
  sensors = [];

  componentDidMount() {
    const canvas = this.refs.canvas;

    // This component will keep track of mouse movements so we can
    // do things like "drag and drop" of sensors.
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

    // TEMP, should come from props
    [
      { id: 1, x: 200, y: 200 },
      { id: 2, x: 300, y: 300 }
    ].forEach(i => {
      this.sensors.push(new Sensor(i.id, i.x, i.y));
    });

    // Draw our floor plan
    this.draw();
  }

  componentWillUnmount() {
    const canvas = this.refs.canvas;

    // We will no longer keep track of mouse movements
    // once the component is no longer visible.
    canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  /**
   * Move events, used for dragging and cursor changes
   * as an example.
   */
  onMouseMove(e) {
    const sensor = this.state.dragging;

    // Mouse over events
    if (sensor || this.matchSensor(e.offsetX, e.offsetY)) {
      this.setState({ cursor: 'pointer' });
    } else {
      this.setState({ cursor: 'default' });
    }

    if (!sensor) return;

    // Sensor positions need to be relative to scale 1
    sensor.x = this.invertScale(this.snap(e.offsetX));
    sensor.y = this.invertScale(this.snap(e.offsetY));

    // Raise an update, with the full list
    // of sensors attached. It's the responsibility
    // of the calling code to batch it with the least amount of
    // updated.
    this.props.onSensorChange && this.props.onSensorChange(this.sensors);
  }

  /**
   * Take a raw value and scale it based on the desired
   * scale setting
   */
  scale(i) {
    return i * (this.props.scale || 1)
  }

  /**
   * Take a scaled value and return it to it's
   * original scale
   */
  invertScale(i) {
    return i / (this.props.scale || 1);
  }

  /**
   * Defines the grid spacing
   */
  space() {
    return this.scale(20);
  }

  /**
   * Formula to snap a coordinate to the
   * grid specified
   */
  snap(i) {
    return (i - (i % this.space()));
  }

  /**
   * Check if a sensor is currently selected
   */
  isSelected(sensor) {
    return this.state.selected && (this.state.selected.id === sensor.id);
  }

  draw() {
    const canvas = this.refs.canvas;

    // Outer container dimensions
    const container = this.refs.container;
    let w = container.clientWidth;
    let h = container.clientHeight;

    // Auto resize canvas scroller. Do
    // a conditional update so we don't choke
    // the browser with needless work.
    if (w > this.state.width || h > this.state.height) {
      this.setState({ width: w, height: h });
    }

    // Draw the image
    const img = new Image;

    // Wait for the floorplan to load before we draw the grid
    img.onload = () => {
      w = Math.max(this.scale(img.naturalWidth), w);
      h = Math.max(this.scale(img.naturalHeight), h);

      // Set the canvas w/h
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);

      // Create 2D context
      const context = canvas.getContext('2d');

      // Clear canvas
      context.clearRect(0, 0, w, h);

      // Draw the floor plan
      Plan(context, img, this.scale(img.naturalWidth), this.scale(img.naturalHeight));

      // Draw the grid
      Grid(context, w, h, this.space());

      // Draw sensors
      this.sensors.forEach(i => i.draw(
        context,
        this.scale(i.x),
        this.scale(i.y),
        this.space() / 2,
        this.isSelected(i)
      ));
    }

    // Set the floorplan source, this will start loading the image
    // in the background.
    img.src ='/plan1.jpg';

    // Keep drawing, this will help with state changes.
    requestAnimationFrame(this.draw.bind(this));
  }

  /**
   * Match a potential sensor based on
   * the X and Y coordinates specified. Will
   * return a sensor entry or null
   */
  matchSensor(x, y) {
    const startX = this.snap(x);
    const startY = this.snap(y);

    // Because we "snap" all our sensors, we can reasonably
    // assume they will all be positioned at the start of the
    // square in terms of pixel position.
    return this.sensors.find(i => {
      return startX === this.scale(i.x) && startY === this.scale(i.y);
    })
  }

  onMouseDown(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const sensor = this.matchSensor(x, y);

    console.log(x + ' + ' + y)
    console.log('SENSOR');
    console.log(sensor);

    // Flag local state so we know this sensor
    // is being dragged
    this.setState({ dragging: sensor });

    // Set locally selected
    this.setState({ selected: sensor });

    // Raise event to the parent component
    this.props.onSelect && this.props.onSelect(sensor);
  }

  /**
   * When mouse moves outside the canvas or release the
   * click button, we should stop dragging any sensors.
   */
  onMouseUp(e) {
    // Release the dragged sensor
    this.setState({ dragging: null });
  }

  render() {
    const { classes } = this.props;
    const { width, height } = this.state;

    return (
      <React.Fragment>
        {/*
          We use a wrapper div so we can determine the size
          of the viewport of the scrolling container
        */}
        <div className={ classes.container } ref='container'>
          <Scrollbars style={{ width, height }}>
            {/*
              The canvas contains our floorplan and the grid. The grid
              represents the blocks our sensors will "snap to"
            */}
            <canvas
              ref='canvas'
              className={ classes.canvas }
              style={{ cursor: this.state.cursor }}
              onMouseDown={this.onMouseDown.bind(this)}
              onMouseUp={this.onMouseUp.bind(this)}
              onMouseLeave={this.onMouseUp.bind(this)}>
            </canvas>
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FloorEditor);
