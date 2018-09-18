import grey from '@material-ui/core/colors/grey';

/**
 * This is not a class cause there should
 * only be one grid used. Consider this a singleton
 */
const Grid = (context, w, h, space) => {
  let x = 0;
  let y = 0;

  while (y < h) {
    y = y + space;
    context.beginPath();

    context.moveTo(0.5, y + 0.5);
    context.lineTo(w + 0.5, y + 0.5);

    context.strokeStyle = grey[200];
    context.lineWidth = 1;

    context.stroke();
    context.closePath();
  }

  while (x < w) {
    x = x + space;
    context.beginPath();

    context.moveTo(x + 0.5, 0.5);
    context.lineTo(x + 0.5, h + 0.5);

    context.strokeStyle = grey[200];
    context.lineWidth = 1;

    context.stroke();
    context.closePath();
  }
}

export default Grid;