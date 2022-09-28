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
