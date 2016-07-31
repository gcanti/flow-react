var React = require('react');

function h(type, props, children) {
  return React.createElement.apply(null, [type, props].concat(children))
}

module.exports = {
  Component: React.Component,
  h: h
};