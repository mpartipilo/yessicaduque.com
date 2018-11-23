exports.onClientEntry = () => {
  // Don't need to do anything here, but if you don't
  // export something, the import won't work.
};

const transitionDelay = 250;

exports.shouldUpdateScroll = () => false;

exports.onRouteUpdate = () =>
  window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
