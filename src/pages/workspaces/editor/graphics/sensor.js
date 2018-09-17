export default class Sensor {
  constructor(x, y, pulse = false) {
    this.x = x;
    this.y = y;
    this.radius = 8;
    this.tick = 0;
    this.pulse = pulse;
  }

  match(x, y) {
    const startX = this.x;
    const startY = this.y;
    const endX = startX + 20;
    const endY = startY + 20;

    console.log('startX ' + startX + ' endX ' + endX + ' startY ' + startY + ' endY ' + endY);
    return x >= startX && x <= endX && y >= startY && y <= endY;
  }

  rgb() {
    return [ 123, 123, 123 ];
  }

  draw(context) {
    let x = this.x + 10; // TODO space constant
    let y = this.y + 10;

    const delay = 50;

    x = x + 0.5; // TODO move snap to grid somewhere else
    y = y + 0.5;

    const rgb = this.rgb();

    if (this.pulse) {
        // Pulsing algorithm
        let osc1 = this.tick / delay;
        let pulse = (this.radius + 15) * osc1;
        let opacity = 1 - osc1;

        context.beginPath();
        context.arc(x, y, pulse, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + opacity + ')';
        context.fill();
    }

    context.beginPath();
    context.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', 1)';
    context.fill();

    this.tick = ++this.tick % delay;
  }
}

export class ActiveSensor extends Sensor {
  rgb() {
    return [ 255, 123, 201 ];
  }
}
