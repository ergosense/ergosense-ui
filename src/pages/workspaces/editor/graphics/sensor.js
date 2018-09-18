import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { hexToRgb } from './../../../../components/helper/functions';

/**
 * The sensor is a class because we will have many. Since
 * we need instanced properties (like animation variables) it's
 * easier to keep these inside a class.
 */
export default class Sensor {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.tick = 0;
  }

  draw(context, x, y, radius, selected) {
    // We want circles in the middle of our
    // square blocks, so we need to offset it
    // by the radius of the circle.
    x = x + radius;
    y = y + radius;

    // Offset pixels because canvas is a
    // silly thing at times.
    x = x + 0.5;
    y = y + 0.5;

    // Default colour
    let rgb = hexToRgb(red[200]);

    if (selected) {
      // Selected colour
      rgb = hexToRgb(red[400]);

      // Animated "ghost" circle that
      // results in a pulse. "speed" controls
      // how fast the animation will be.
      let speed = 45;
      let osc = this.tick / speed;
      let pulse = (radius + (radius * 2)) * osc;
      let opacity = 1 - osc;

      context.beginPath();
      context.arc(x, y, pulse, 0, 2 * Math.PI, false);
      context.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.g + ', ' + opacity + ')';
      context.fill();

      this.tick = ++this.tick % speed;
    } else {
      // Reset animation
      this.tick = 0;
    }

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)';
    context.fill();
  }
}