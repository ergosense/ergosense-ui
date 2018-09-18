/**
 * This is not a class cause there should
 * only be one floor plan. Consider this a singleton.
 */
const Plan = (context, img, w, h) => {
  context.drawImage(img, 0, 0, w, h);
}

export default Plan;