import React from 'react';

const Logo = () => (
  <svg viewBox="0 0 100 100" width="50" height="50">
    <g>
      <title>background</title>
      <rect fill="#fff" id="canvas_background" height="102" width="102" y="-1" x="-1" />
      <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
        <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
      </g>
    </g>
    <g>
      <title>Layer 1</title>
      <path id="svg_1" d="m49.99999,8.95834c-24.22013,0 -43.85416,18.37561 -43.85416,41.04237c0,7.74589 2.32115,14.98204 6.31521,21.1609l-6.31521,17.2768l17.58229,-5.63319c7.32675,5.14846 16.40465,8.23645 26.27187,8.23645c24.22015,0 43.85417,-18.37563 43.85417,-41.04096c0,-22.66675 -19.63402,-41.04237 -43.85417,-41.04237l0,0z" strokeWidth="1.5" stroke="#ff0000" fill="#ff0000" />
      <path stroke="#ffffff" transform="rotate(90 54.16666793823242,50.00000000000001) " id="svg_2" d="m39.16667,62.60417l15,-25.20833l15,25.20833l-30,0z" strokeWidth="1.5" fill="#ffffff" />
    </g>
  </svg>
);

export default Logo;
