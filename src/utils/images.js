/**
 * Rotate image in clockwise or anti-clockwise
 * @param {string} base64Image
 * @param {boolean} isClockwise
 * @return {string}
 */
export const rotateBase64Image90deg = (base64Image, isClockwise) => {
  // create an off-screen canvas
  let offScreenCanvas = document.createElement('canvas');
  let offScreenCanvasCtx = offScreenCanvas.getContext('2d');

  // create Image
  const img = new Image();
  img.src = base64Image;

  // set its dimension to rotated size
  offScreenCanvas.height = img.width;
  offScreenCanvas.width = img.height;

  // rotate and draw source image into the off-screen canvas:
  if (isClockwise) {
    offScreenCanvasCtx.rotate(90 * Math.PI / 180);
    offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
  } else {
    offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
    offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
  }
  offScreenCanvasCtx.drawImage(img, 0, 0);

  // encode image to data-uri with base64
  return offScreenCanvas.toDataURL('image/jpeg', 100);
};

/**
 * Convert data image to binary file
 * @param {string} dataURI
 * @return {Blob}
 */
export const dataURItoBlob = dataURI => {
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
};
