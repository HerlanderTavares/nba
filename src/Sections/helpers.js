import hexToHsl from 'hex-to-hsl';
import {getMainColor} from 'nba-color';

export const viewPortHeight = () => {
  const resize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  resize();
  window.addEventListener('resize', resize);
};

export const checkProp = (prop, defaultValue = null) => (prop ? prop : defaultValue);

export const checkClass = classNameProp => (classNameProp ? ' ' + classNameProp : '');

export const css = (styles, ...classes) => `${[...classes].map(cl => eval(styles)[cl]).join(' ')}`;

export const isImage = url => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

export const calcAge = date => {
  const dob = new Date(date);
  const currentDate = new Date();
  const age = Math.trunc((currentDate - dob) / (1000 * 60 * 60 * 24 * 30 * 12));

  const formatMonth = new Intl.DateTimeFormat('en', {month: 'long'});

  return {
    day: dob.getDate(),
    month: formatMonth.format(dob),
    year: dob.getFullYear(),
    age,
  };
};

export const nbaColor = (tricode, options = {}) => {
  const {hex} = getMainColor(tricode);
  const hsl = hexToHsl(hex);
  const hue = hsl[0];
  const saturation = hsl[1] - 20;
  const lightness = hsl[2];

  const colorObj = {
    hue,
    saturation,
    lightness,
  };

  switch (true) {
    case options?.secondary === true:
      if (colorObj.lightness > 15) colorObj.lightness -= 15;
      else colorObj.lightness += 15;
      break;
    case options?.text === true:
      if (colorObj.lightness > 30) colorObj.lightness -= 30;
      else colorObj.lightness = 100;
      break;
  }

  for (const key in colorObj) if (options[key]) colorObj[key] += options[key];

  return {
    ...colorObj,
    color: `hsl(${colorObj.hue}deg, ${colorObj.saturation}%, ${colorObj.lightness}%)`,
  };
};
