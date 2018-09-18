export const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export const animate = (originalValue, desiredValue, ticks, cb, tick = 0) => {
  const diff = desiredValue - originalValue;

  // Ease in and out
  const ease = (t) => {
    return t < 0.5 ? (4 * t * t * t) : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
  };

  // Figure out the factor
  let factor = (++tick / ticks);
  factor = ease(factor);

  const value = originalValue + (diff * factor);
  cb(value);

  // Break out of animation, we are done
  if (tick >= ticks) return;

  // Set next execution
  requestAnimationFrame(() => {
    animate(originalValue, desiredValue, ticks, cb, tick);
  });
}