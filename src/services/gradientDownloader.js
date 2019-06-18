import { saveAs } from 'file-saver';
import toBlob from 'canvas-to-blob';

import Canvas from './canvasHelpers';

// Adds toBlob polyfill (for safari)
toBlob.init();

export default function (direction, name, ...colors) {
  const canvas = document.createElement('canvas');

  const fixedHeight = 500;
  const fixedWidth = 500;

  canvas.id = 'canva';
  canvas.width = fixedWidth; // eslint-disable-line
  canvas.height = fixedHeight; // eslint-disable-line
  canvas.style.zIndex = 1;
  canvas.style.position = 'absolute';
  document.body.appendChild(canvas);

  const canva = document.getElementById('canva');
  const ctx = canva.getContext('2d');

  const dir = Canvas.generateCoordinates(direction, canvas.height, canvas.width);
  const grd = ctx.createLinearGradient(...dir);

  ctx.fillStyle = Canvas.generateFillStyle(grd, ...colors);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    saveAs(blob, `${name}.png`);
  });

  document.getElementById('canva').remove();
}
