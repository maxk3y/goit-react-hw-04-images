import disableScroll from 'disable-scroll';

export const ScrollDisabled = () => {
  return disableScroll.on();
};

export const ScrollEnabled = () => {
  return disableScroll.off();
};
