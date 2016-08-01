declare module 'flow-react' {

  declare type Element<T, Config = any> = React$Element<Config> & { __flow_react_type: T }; // <= hack

  declare class Component<P: Object = {}, C = void, S = void, D = void> extends React$Component<D, P, S> {
    static defaultProps: $Abstract<D>;
    props: P & { children: C };
    state: S;
  }

  declare class PureComponent<P: Object = {}, C = void, D = void> extends Component<P, C, D, void> {}

  declare type EmptyTags = 'hr' | 'input'; // etc...

  declare type NonEmptyTags = 'div' | 'a' | 'button'; // etc...

  declare function h<T: EmptyTags>(
    type: T,
    props?: Object,
    ...rest: Array<void> // enforce no more arguments
  ): Element<T>;

  declare function h<T: NonEmptyTags>(
    type: T,
    props?: Object | null,
    children?: any,
    ...rest: Array<void> // enforce no more arguments
  ): Element<T>;

  declare function h<P, C, S, D, T: Component<P, C, S, D>>(
    type: Class<T>,
    props: $Diff<P, D> & {}, // <= prevent null otherwise $Diff seems to throw away type checking
    children: C,
    ...rest: Array<void> // enforce no more arguments
  ): Element<T>;

}