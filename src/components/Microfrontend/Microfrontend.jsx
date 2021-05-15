import React, { useEffect } from 'react';

export const Microfrontend = ({ name, host }) => {
  const renderMicroFrontend = () => {
    window[`render${name}`](`${name}-container`, history);
  };

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `${host}${manifest.files['main.js']}`;
        script.crossOrigin = '';
        script.onload = renderMicroFrontend;
        document.head.appendChild(script);
      });
  }, []);

  return <main id={`${name}-container`} />;
};
