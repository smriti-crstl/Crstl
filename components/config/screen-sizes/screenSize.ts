const SIZE = {
  laptop: "1366px",
  laptopL: "1600px",
  desktop: "1920px",
  desktopL: "2400px",
};

export const DEVICE = {
  laptop: `(min-width: ${SIZE.laptop})`,
  laptopL: `(min-width: ${SIZE.laptopL})`,
  desktop: `(min-width: ${SIZE.desktop})`,
  desktopL: `(min-width: ${SIZE.desktopL})`,
};
