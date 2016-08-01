declare module 'flow-react' {

  declare type $Strict<T> = T & $Shape<T>;

  declare type Element<T, Config = any> = React$Element<Config> & { __flow_react_type: T }; // <= hack

  declare class Component<P: Object = {}, C = void, S = void, D = void> extends React$Component<D, P, S> {
    static defaultProps: $Abstract<D>;
    props: P & { children: C };
    state: S;
  }

  declare class PureComponent<P: Object = {}, C = void, D = void> extends Component<P, C, D, void> {}

  declare type Tags =
    | 'a'
    | 'abbr'
    | 'address'
    | 'area'
    | 'article'
    | 'aside'
    | 'audio'
    | 'b'
    | 'base'
    | 'bdi'
    | 'bdo'
    | 'big'
    | 'blockquote'
    | 'body'
    | 'br'
    | 'button'
    | 'canvas'
    | 'caption'
    | 'cite'
    | 'code'
    | 'col'
    | 'colgroup'
    | 'data'
    | 'datalist'
    | 'dd'
    | 'del'
    | 'details'
    | 'dfn'
    | 'dialog'
    | 'div'
    | 'dl'
    | 'dt'
    | 'em'
    | 'embed'
    | 'fieldset'
    | 'figcaption'
    | 'figure'
    | 'footer'
    | 'form'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'head'
    | 'header'
    | 'hgroup'
    | 'hr'
    | 'html'
    | 'i'
    | 'iframe'
    | 'img'
    | 'input'
    | 'ins'
    | 'kbd'
    | 'keygen'
    | 'label'
    | 'legend'
    | 'li'
    | 'link'
    | 'main'
    | 'map'
    | 'mark'
    | 'menu'
    | 'menuitem'
    | 'meta'
    | 'meter'
    | 'nav'
    | 'noscript'
    | 'object'
    | 'ol'
    | 'optgroup'
    | 'option'
    | 'output'
    | 'p'
    | 'param'
    | 'picture'
    | 'pre'
    | 'progress'
    | 'q'
    | 'rp'
    | 'rt'
    | 'ruby'
    | 's'
    | 'samp'
    | 'script'
    | 'section'
    | 'select'
    | 'small'
    | 'source'
    | 'span'
    | 'strong'
    | 'style'
    | 'sub'
    | 'summary'
    | 'sup'
    | 'table'
    | 'tbody'
    | 'td'
    | 'textarea'
    | 'tfoot'
    | 'th'
    | 'thead'
    | 'time'
    | 'title'
    | 'tr'
    | 'track'
    | 'u'
    | 'ul'
    | 'var'
    | 'video'
    | 'wbr'
    | 'circle'
    | 'clipPath'
    | 'defs'
    | 'ellipse'
    | 'g'
    | 'image'
    | 'line'
    | 'linearGradient'
    | 'mask'
    | 'path'
    | 'pattern'
    | 'polygon'
    | 'polyline'
    | 'radialGradient'
    | 'rect'
    | 'stop'
    | 'svg'
    | 'text'
    | 'tspan'
    ;

  declare function h<T: Tags>(
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