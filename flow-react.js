declare module 'flow-react' {

  /*

    Advanced type checking for react using Flow

    Type legend:

    P = Props
    C = Children
    S = State
    D = DefaultProps

    Note. The syntax "Type = void" means applying a default

  */

  declare type Element<T, Config = any> = React$Element<Config> & { __flow_react_type: T }; // <= hack

  declare class Component<P: Object = {}, C = void, S = void, D = void> {
    static defaultProps: $Abstract<D>;
    props: P & { children: C };
    state: S;

    render(): ?Element<any>;
    setState(partialState: $Shape<S>, callback?: () => void): void;
    componentWillMount(): void;
    // ...other methods here...
  }

  // list of overloadings of h()

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