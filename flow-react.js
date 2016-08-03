declare module 'flow-react' {

  /*

    helper to narrow down component props

    Example:

    class A extends Component<$Strict<{ a: number }>> {}

    v(A, { a: 1 })       // ok
    v(A, { a: 1, b: 2 }) // error

  */
  declare type $Strict<T> = T & $Shape<T>;

  /*

    Refinement of React$Element in order to retain the type of the vdom builder

  */
  declare type Vdom<Builder, Config = any> =
    & React$Element<Config>
    & { __flow_react_type: Builder }
    ;

  /*

    Refinement of React$Component in order to add type checkinf for children

    Note. Props, Children, State, DefaultProps have defaults.

  */
  declare class Component<Props: Object = {}, Children = void, State = void, DefaultProps = void> extends React$Component<DefaultProps, Props, State> {
    static defaultProps: $Abstract<DefaultProps>;
    props: Props & { children: Children };
    state: State;
  }

  declare class PureComponent<Props: Object = {}, Children = void, DefaultProps = void> extends Component<Props, Children, DefaultProps, void> {}

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

  declare function v<Builder: Tags>(
    type: Builder,
    props?: Object | null,
    children?: any,
    ...rest: Array<void> // enforce no more arguments
  ): Vdom<Builder>;

  declare function v<Props, Children, State, DefaultProps, Builder: Component<Props, Children, State, DefaultProps>>(
    type: Class<Builder>,
    props: $Diff<Props, DefaultProps> & {}, // <= prevent null otherwise $Diff will throw away type checking
    children: Children,
    ...rest: Array<void> // enforce no more arguments
  ): Vdom<Builder>;

  declare type A = Vdom<'a'>;
  declare type Abbr = Vdom<'abbr'>;
  declare type Address = Vdom<'address'>;
  declare type Area = Vdom<'area'>;
  declare type Article = Vdom<'article'>;
  declare type Aside = Vdom<'aside'>;
  declare type Audio = Vdom<'audio'>;
  declare type B = Vdom<'b'>;
  declare type Base = Vdom<'base'>;
  declare type Bdi = Vdom<'bdi'>;
  declare type Bdo = Vdom<'bdo'>;
  declare type Big = Vdom<'big'>;
  declare type Blockquote = Vdom<'blockquote'>;
  declare type Body = Vdom<'body'>;
  declare type Br = Vdom<'br'>;
  declare type Button = Vdom<'button'>;
  declare type Canvas = Vdom<'canvas'>;
  declare type Caption = Vdom<'caption'>;
  declare type Cite = Vdom<'cite'>;
  declare type Code = Vdom<'code'>;
  declare type Col = Vdom<'col'>;
  declare type Colgroup = Vdom<'colgroup'>;
  declare type Data = Vdom<'data'>;
  declare type Datalist = Vdom<'datalist'>;
  declare type Dd = Vdom<'dd'>;
  declare type Del = Vdom<'del'>;
  declare type Details = Vdom<'details'>;
  declare type Dfn = Vdom<'dfn'>;
  declare type Dialog = Vdom<'dialog'>;
  declare type Div = Vdom<'div'>;
  declare type Dl = Vdom<'dl'>;
  declare type Dt = Vdom<'dt'>;
  declare type Em = Vdom<'em'>;
  declare type Embed = Vdom<'embed'>;
  declare type Fieldset = Vdom<'fieldset'>;
  declare type Figcaption = Vdom<'figcaption'>;
  declare type Figure = Vdom<'figure'>;
  declare type Footer = Vdom<'footer'>;
  declare type Form = Vdom<'form'>;
  declare type H1 = Vdom<'h1'>;
  declare type H2 = Vdom<'h2'>;
  declare type H3 = Vdom<'h3'>;
  declare type H4 = Vdom<'h4'>;
  declare type H5 = Vdom<'h5'>;
  declare type H6 = Vdom<'h6'>;
  declare type Head = Vdom<'head'>;
  declare type Header = Vdom<'header'>;
  declare type Hgroup = Vdom<'hgroup'>;
  declare type Hr = Vdom<'hr'>;
  declare type Html = Vdom<'html'>;
  declare type I = Vdom<'i'>;
  declare type Iframe = Vdom<'iframe'>;
  declare type Img = Vdom<'img'>;
  declare type Input = Vdom<'input'>;
  declare type Ins = Vdom<'ins'>;
  declare type Kbd = Vdom<'kbd'>;
  declare type Keygen = Vdom<'keygen'>;
  declare type Label = Vdom<'label'>;
  declare type Legend = Vdom<'legend'>;
  declare type Li = Vdom<'li'>;
  declare type Link = Vdom<'link'>;
  declare type Main = Vdom<'main'>;
  declare type Map = Vdom<'map'>;
  declare type Mark = Vdom<'mark'>;
  declare type Menu = Vdom<'menu'>;
  declare type Menuitem = Vdom<'menuitem'>;
  declare type Meta = Vdom<'meta'>;
  declare type Meter = Vdom<'meter'>;
  declare type Nav = Vdom<'nav'>;
  declare type Noscript = Vdom<'noscript'>;
  declare type Object = Vdom<'object'>;
  declare type Ol = Vdom<'ol'>;
  declare type Optgroup = Vdom<'optgroup'>;
  declare type Option = Vdom<'option'>;
  declare type Output = Vdom<'output'>;
  declare type P = Vdom<'p'>;
  declare type Param = Vdom<'param'>;
  declare type Picture = Vdom<'picture'>;
  declare type Pre = Vdom<'pre'>;
  declare type Progress = Vdom<'progress'>;
  declare type Q = Vdom<'q'>;
  declare type Rp = Vdom<'rp'>;
  declare type Rt = Vdom<'rt'>;
  declare type Ruby = Vdom<'ruby'>;
  declare type S = Vdom<'s'>;
  declare type Samp = Vdom<'samp'>;
  declare type Script = Vdom<'script'>;
  declare type Section = Vdom<'section'>;
  declare type Select = Vdom<'select'>;
  declare type Small = Vdom<'small'>;
  declare type Source = Vdom<'source'>;
  declare type Span = Vdom<'span'>;
  declare type Strong = Vdom<'strong'>;
  declare type Style = Vdom<'style'>;
  declare type Sub = Vdom<'sub'>;
  declare type Summary = Vdom<'summary'>;
  declare type Sup = Vdom<'sup'>;
  declare type Table = Vdom<'table'>;
  declare type Tbody = Vdom<'tbody'>;
  declare type Td = Vdom<'td'>;
  declare type Textarea = Vdom<'textarea'>;
  declare type Tfoot = Vdom<'tfoot'>;
  declare type Th = Vdom<'th'>;
  declare type Thead = Vdom<'thead'>;
  declare type Time = Vdom<'time'>;
  declare type Title = Vdom<'title'>;
  declare type Tr = Vdom<'tr'>;
  declare type Track = Vdom<'track'>;
  declare type U = Vdom<'u'>;
  declare type Ul = Vdom<'ul'>;
  declare type Var = Vdom<'var'>;
  declare type Video = Vdom<'video'>;
  declare type Wbr = Vdom<'wbr'>;
  declare type Circle = Vdom<'circle'>;
  declare type ClipPath = Vdom<'clipPath'>;
  declare type Defs = Vdom<'defs'>;
  declare type Ellipse = Vdom<'ellipse'>;
  declare type G = Vdom<'g'>;
  declare type Image = Vdom<'image'>;
  declare type Line = Vdom<'line'>;
  declare type LinearGradient = Vdom<'linearGradient'>;
  declare type Mask = Vdom<'mask'>;
  declare type Path = Vdom<'path'>;
  declare type Pattern = Vdom<'pattern'>;
  declare type Polygon = Vdom<'polygon'>;
  declare type Polyline = Vdom<'polyline'>;
  declare type RadialGradient = Vdom<'radialGradient'>;
  declare type Rect = Vdom<'rect'>;
  declare type Stop = Vdom<'stop'>;
  declare type Svg = Vdom<'svg'>;
  declare type Text = Vdom<'text'>;
  declare type Tspan = Vdom<'tspan'>;

}