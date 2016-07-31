Advanced type checking for react using Flow

# Setup

```sh
npm install flow-react --save
```

# Usage

```js
import { h, Component } from 'flow-react'
import type { Element } from 'flow-react'
import ReactDOM from 'react-dom'

// default for props = {}
export class C1 extends Component<{}, void, void, void> {}
h(C1, {})
// h(C1, {}, 'hello') // error
// h(C1) // error
// h(C1, null) // error
// h(C1, undefined) // error
// const C1$prime: Class<Component<{a: number}>> = C1 // error
const C1$prime: Class<Component<*>> = C1
// h(C1$prime, {}, 'hello') // error

export class C2 extends Component<{a: number, b?: number}> {}
h(C2, {a: 1})
h(C2, {a: 1, b: 2})
// h(C1, {a: 1}, 'hello') // error
// h(C1) // error
// h(C1, null) // error
// h(C1, undefined) // error

// strictness: use $Shape<P>
export class C3 extends Component<$Shape<{a: number}>> {}
h(C3, {a: 1})
// h(C3, {a: 1, b: 2}) // error

// child
export class C4 extends Component<{}, string> {}
h(C4, {}, 'a')
// h(C4, {}, 1) // error

// children
export class C5 extends Component<{}, Array<string>> {}
h(C5, {}, ['a', 'b'])
// h(C5, {}, ['a', 1]) // error

// tagged children
export class C6 extends Component<{}, Element<'div'>> {}
h(C6, {}, h('div'))
// h(C6, {}, h('a')) // error

// function as child
export class C7 extends Component<{}, (x: number) => number> {}
h(C7, {}, (n) => n + 1)
// h(C7, {}, h('div')) // error

// component child
export class C8 extends Component<{}, Element<C1>> {}
h(C8, {}, h(C1, {}))
// h(C8, {}, h('div')) // error

// default props
export class C9 extends Component<{ a: number, b: number }, void, void, { a: number }> {
  static defaultProps = {a: 1}
}
h(C9, { b: 2 })
h(C9, { a: 2, b: 2 })
// h(C9, {}) // error

// state
export class C10 extends Component<{ a: number }, void, { a: number }> {
  constructor(props: { a: number }) {
    super(props)
    this.state = { a: props.a }
    // this.state = { a: 's' } // error
  }
  componentWillMount() {
    this.setState({ a: 4 })
    // this.setState({ a: 's' }) // error
  }
}

// HOC
function hoc<P1: Object, P2: Object>(c: Class<Component<P1, *, *, *>>, f: (_: P2) => P1): Class<Component<P2>> {
  return class C extends Component<P2> {
    render() {
      return h(c, f(this.props))
    }
  }
}

function fn(props: {b: string}): {a: number} {
  return { a: props.b.length }
}

export class C11 extends Component<{a: number}> {}

// const C12 = hoc(C9, fn) // error
const C12 = hoc(C11, fn)

h(C12, { b: 'hello' })

// real world example
type DefaultProps = {
  type: string
};

type Props = {
  type: string
};

type Children = string;

export default class Alert extends Component<Props, Children, void, DefaultProps> {

  static defaultProps = {
    type: 'info'
  };

  render() {
    const className = 'alert alert-' + this.props.type
    return (
      h('div', { className }, this.props.children)
    )
  }

}

ReactDOM.render(
  h(Alert, {}, 'hello'),
  document.getElementById('app')
)
```

