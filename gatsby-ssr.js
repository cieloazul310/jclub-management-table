/* eslint react/jsx-filename-extension: warn */

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require('react');
// import { RenderBodyArgs } from 'gatsby';

const HeadComponents = [
  <script
    key="1-http-ads"
    data-ad-client="ca-pub-7323207940463794"
    async
    crossOrigin="anonymous"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7323207940463794"
  />,
];

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};
