const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');

const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');

const colorBox = document.getElementById('colorBox');
const hexCode = document.getElementById('hexCode');
const colorPicker = document.getElementById('colorPicker');

function updateColorFromSliders() {
  const red = parseInt(redSlider.value);
  const green = parseInt(greenSlider.value);
  const blue = parseInt(blueSlider.value);

  updateColor(red, green, blue);

  // Synchronize input fields with slider values
  redInput.value = red;
  greenInput.value = green;
  blueInput.value = blue;

  // Synchronize the color picker
  colorPicker.value = rgbToHex(red, green, blue);
}

function updateColorFromInputs() {
  const red = parseInt(redInput.value) || 0;
  const green = parseInt(greenInput.value) || 0;
  const blue = parseInt(blueInput.value) || 0;

  const clampedRed = Math.min(Math.max(red, 0), 255);
  const clampedGreen = Math.min(Math.max(green, 0), 255);
  const clampedBlue = Math.min(Math.max(blue, 0), 255);

  updateColor(clampedRed, clampedGreen, clampedBlue);

  redSlider.value = clampedRed;
  greenSlider.value = clampedGreen;
  blueSlider.value = clampedBlue;

  colorPicker.value = rgbToHex(clampedRed, clampedGreen, clampedBlue);
}

function updateColorFromPicker() {
  const hex = colorPicker.value;
  const { r, g, b } = hexToRgb(hex);

  updateColor(r, g, b);

  // Synchronize sliders and inputs
  redSlider.value = r;
  greenSlider.value = g;
  blueSlider.value = b;
  redInput.value = r;
  greenInput.value = g;
  blueInput.value = b;
}

function updateColor(red, green, blue) {
  const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  colorBox.style.backgroundColor = rgbColor;
  hexCode.textContent = rgbToHex(red, green, blue);
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// Event listeners for sliders
redSlider.addEventListener('input', updateColorFromSliders);
greenSlider.addEventListener('input', updateColorFromSliders);
blueSlider.addEventListener('input', updateColorFromSliders);

// Event listeners for manual inputs
redInput.addEventListener('input', updateColorFromInputs);
greenInput.addEventListener('input', updateColorFromInputs);
blueInput.addEventListener('input', updateColorFromInputs);

// Event listener for color picker
colorPicker.addEventListener('input', updateColorFromPicker);

// Initialize default color
updateColorFromSliders();
