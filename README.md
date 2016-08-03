Advanced static type checking for react using Flow

# Motivation

I consider JSX pretty handy but *not critical*.

What I consider critical instead is the possibility to statically type check as much as I can and currently the possibilities of Flow are kind of limited when it comes to react.

For example there's no way to add constraints to `this.props.children` (e.g. The component `A` must accept exactly 2 children: the first one must be an instance of component `B`, the second one must be an instance of component `C` or a `string` )

Another example are higher order components, even if it's a popular pattern in the community, currently Flow doesn't play well with HOCs (https://github.com/facebook/flow/issues/1964).

Leaving the comfort of JSX is not a light heartedly decision but it's worth noting this kind of type checking is opt-in, you can mix and match JSX (relatively unsafe) with the vdom builder `v` (safer).

**Example**

Requirement. The `Button` component must have a label property and must not have any children

```js
import { v, Component } from 'flow-react'
import type { Vdom } from 'flow-react'

class Button extends Component<{ label: string }> {
  render() {
    return v('button', null, this.props.label)
  }
}

const btn = v(Button, { label: 'Click me' })
v(Button, {}) // error: property `label` not found
v(Button, { label: 'Click me' }, 'hello') // error
//                               ^^^^^^^ string. This type is incompatible with Children = void
```

Requirement. The `ButtonWrapper` component must not have any properties and must have a single child which must be an instance of the `Button` component

```js
class ButtonWrapper extends Component<$Shape<{}>, Vdom<Button>> {
  render() {
    return v('div', null, this.props.children)
  }
}

v(ButtonWrapper, {}, btn) // ok
v(ButtonWrapper, { a: 1 }, btn) // error: property `a` not found
v(ButtonWrapper, {}, 'hello') // error
//                   ^^^^^^^ string. This type is incompatible with React$Element
(ButtonWrapper, {}, [btn, btn]) // error
//                  ^^^^^^^^^^ array literal. This type is incompatible with React$Element
```

Using JSX in the `render` method is fine, but calling a component with JSX can be unsafe

```js
class ButtonWrapper extends Component<$Shape<{}>, Vdom<Button>> {
  render() {
    // JSX (unsafe)
    return <div>{this.props.children}</div>
  }
}

// v(ButtonWrapper, {}, 'hello') // <= using the v builder is safe
//                      ^^^^^^^ string. This type is incompatible with React$Element
<ButtonWrapper>hello</ButtonWrapper> // <= this is unsafe, no errors!
```

# Setup

```sh
npm install flow-react --save
```

# API

## Exports

### Component (class)

`Component<P: Object = {}, C = void, S = void, D = void>`

where

- `P` = Props
- `C` = Children
- `S` = State
- `D` = DefaultProps

### v (function)

```js
type Tags = 'a' | 'abbr' | 'address' | /* etc... */ ;

v<T: Tags>(type: T, props?: Object | null, children?: any): Vdom<T>
v<P, C, S, D, T: Component<P, C, S, D>>(type: Class<T>, props: Object, children: C): Vdom<T>
```

## Types

### $Strict

Useful to tighten up your props

Example

```js
import type { $Strict } from 'flow-react'

class A extends Component<{ a: number }> {}
v(A, { a: 1 })       // ok
v(A, { a: 1, b: 1 }) // ok

class A extends Component<$Strict<{ a: number }>> {}
v(A, { a: 1 })       // ok
v(A, { a: 1, b: 1 }) // error
```

### Vdom

`Vdom<T>`

where

- `T` = string | your react component

### Vdom shortcuts

One for each `Tags` member

Example

```js
import type { Div } from 'flow-react'

export class A extends Component<{}, Div> {} // <= same as Vdom<'div'>
v(A, {}, v('div'))
// v(A, {}, v('a')) // error
```

# Usage

**Note**. Add `./node_modules/flow-react/flow-react.js` to your libdefs.

```js
import { h, Component } from 'flow-react'
import type { Vdom } from 'flow-react'
import ReactDOM from 'react-dom'

// default for props = {}
export class C1 extends Component {}
v(C1, {})
// v(C1, {}, 'hello') // error
// v(C1) // error
// v(C1, null) // error
// v(C1, undefined) // error
// const C1$prime: Class<Component<{a: number}>> = C1 // error
const C1$prime: Class<Component<*>> = C1
// v(C1$prime, {}, 'hello') // error

export class C2 extends Component<{a: number, b?: number}> {}
v(C2, {a: 1})
v(C2, {a: 1, b: 2})
// v(C1, {a: 1}, 'hello') // error
// v(C1) // error
// v(C1, null) // error
// v(C1, undefined) // error

// strictness: use $Shape<P>
export class C3 extends Component<$Shape<{a: number}>> {}
v(C3, {a: 1})
// v(C3, {a: 1, b: 2}) // error

// child
export class C4 extends Component<{}, string> {}
v(C4, {}, 'a')
// v(C4, {}, 1) // error

// children
export class C5 extends Component<{}, Array<string>> {}
v(C5, {}, ['a', 'b'])
// v(C5, {}, ['a', 1]) // error

// tagged children
export class C6 extends Component<{}, Vdom<'div'>> {}
v(C6, {}, v('div'))
// v(C6, {}, v('a')) // error

// function as child
export class C7 extends Component<{}, (x: number) => number> {}
v(C7, {}, (n) => n + 1)
// v(C7, {}, v('div')) // error

// component child
export class C8 extends Component<{}, Vdom<C1>> {}
v(C8, {}, v(C1, {}))
// v(C8, {}, v('div')) // error

// default props
export class C9 extends Component<{ a: number, b: number }, void, void, { a: number }> {
  static defaultProps = {a: 1}
}
v(C9, { b: 2 })
v(C9, { a: 2, b: 2 })
// v(C9, {}) // error

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
      return v(c, f(this.props))
    }
  }
}

function fn(props: {b: string}): {a: number} {
  return { a: props.b.length }
}

export class C11 extends Component<{a: number}> {}

// const C12 = hoc(C9, fn) // error
const C12 = hoc(C11, fn)

v(C12, { b: 'hello' })
```

