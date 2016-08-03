var React = require('react');

function v(type, props, children) {
  return React.createElement.apply(null, [type, props].concat(children))
}

module.exports = {
  Component: React.Component,
  PureComponent: React.PureComponent,
  v: v
};