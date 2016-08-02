declare module 'flow-react' {

  /*

    helper to narrow down component props

    Example:

    class A extends Component<$Strict<{ a: number }>> {}

    h(A, { a: 1 })       // ok
    h(A, { a: 1, b: 2 }) // error

  */
  declare type $Strict<T> = T & $Shape<T>;

  /*

    Refinement of React$Element in order to retain the type of the vdom builder

  */
  declare type Element<Builder, Config = any> =
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

  declare function h<Builder: Tags>(
    type: Builder,
    props?: Object | null,
    children?: any,
    ...rest: Array<void> // enforce no more arguments
  ): Element<Builder>;

  declare function h<Props, Children, State, DefaultProps, Builder: Component<Props, Children, State, DefaultProps>>(
    type: Class<Builder>,
    props: $Diff<Props, DefaultProps> & {}, // <= prevent null otherwise $Diff will throw away type checking
    children: Children,
    ...rest: Array<void> // enforce no more arguments
  ): Element<Builder>;

  declare type A = Element<'a'>;
  declare type Abbr = Element<'abbr'>;
  declare type Address = Element<'address'>;
  declare type Area = Element<'area'>;
  declare type Article = Element<'article'>;
  declare type Aside = Element<'aside'>;
  declare type Audio = Element<'audio'>;
  declare type B = Element<'b'>;
  declare type Base = Element<'base'>;
  declare type Bdi = Element<'bdi'>;
  declare type Bdo = Element<'bdo'>;
  declare type Big = Element<'big'>;
  declare type Blockquote = Element<'blockquote'>;
  declare type Body = Element<'body'>;
  declare type Br = Element<'br'>;
  declare type Button = Element<'button'>;
  declare type Canvas = Element<'canvas'>;
  declare type Caption = Element<'caption'>;
  declare type Cite = Element<'cite'>;
  declare type Code = Element<'code'>;
  declare type Col = Element<'col'>;
  declare type Colgroup = Element<'colgroup'>;
  declare type Data = Element<'data'>;
  declare type Datalist = Element<'datalist'>;
  declare type Dd = Element<'dd'>;
  declare type Del = Element<'del'>;
  declare type Details = Element<'details'>;
  declare type Dfn = Element<'dfn'>;
  declare type Dialog = Element<'dialog'>;
  declare type Div = Element<'div'>;
  declare type Dl = Element<'dl'>;
  declare type Dt = Element<'dt'>;
  declare type Em = Element<'em'>;
  declare type Embed = Element<'embed'>;
  declare type Fieldset = Element<'fieldset'>;
  declare type Figcaption = Element<'figcaption'>;
  declare type Figure = Element<'figure'>;
  declare type Footer = Element<'footer'>;
  declare type Form = Element<'form'>;
  declare type H1 = Element<'h1'>;
  declare type H2 = Element<'h2'>;
  declare type H3 = Element<'h3'>;
  declare type H4 = Element<'h4'>;
  declare type H5 = Element<'h5'>;
  declare type H6 = Element<'h6'>;
  declare type Head = Element<'head'>;
  declare type Header = Element<'header'>;
  declare type Hgroup = Element<'hgroup'>;
  declare type Hr = Element<'hr'>;
  declare type Html = Element<'html'>;
  declare type I = Element<'i'>;
  declare type Iframe = Element<'iframe'>;
  declare type Img = Element<'img'>;
  declare type Input = Element<'input'>;
  declare type Ins = Element<'ins'>;
  declare type Kbd = Element<'kbd'>;
  declare type Keygen = Element<'keygen'>;
  declare type Label = Element<'label'>;
  declare type Legend = Element<'legend'>;
  declare type Li = Element<'li'>;
  declare type Link = Element<'link'>;
  declare type Main = Element<'main'>;
  declare type Map = Element<'map'>;
  declare type Mark = Element<'mark'>;
  declare type Menu = Element<'menu'>;
  declare type Menuitem = Element<'menuitem'>;
  declare type Meta = Element<'meta'>;
  declare type Meter = Element<'meter'>;
  declare type Nav = Element<'nav'>;
  declare type Noscript = Element<'noscript'>;
  declare type Object = Element<'object'>;
  declare type Ol = Element<'ol'>;
  declare type Optgroup = Element<'optgroup'>;
  declare type Option = Element<'option'>;
  declare type Output = Element<'output'>;
  declare type P = Element<'p'>;
  declare type Param = Element<'param'>;
  declare type Picture = Element<'picture'>;
  declare type Pre = Element<'pre'>;
  declare type Progress = Element<'progress'>;
  declare type Q = Element<'q'>;
  declare type Rp = Element<'rp'>;
  declare type Rt = Element<'rt'>;
  declare type Ruby = Element<'ruby'>;
  declare type S = Element<'s'>;
  declare type Samp = Element<'samp'>;
  declare type Script = Element<'script'>;
  declare type Section = Element<'section'>;
  declare type Select = Element<'select'>;
  declare type Small = Element<'small'>;
  declare type Source = Element<'source'>;
  declare type Span = Element<'span'>;
  declare type Strong = Element<'strong'>;
  declare type Style = Element<'style'>;
  declare type Sub = Element<'sub'>;
  declare type Summary = Element<'summary'>;
  declare type Sup = Element<'sup'>;
  declare type Table = Element<'table'>;
  declare type Tbody = Element<'tbody'>;
  declare type Td = Element<'td'>;
  declare type Textarea = Element<'textarea'>;
  declare type Tfoot = Element<'tfoot'>;
  declare type Th = Element<'th'>;
  declare type Thead = Element<'thead'>;
  declare type Time = Element<'time'>;
  declare type Title = Element<'title'>;
  declare type Tr = Element<'tr'>;
  declare type Track = Element<'track'>;
  declare type U = Element<'u'>;
  declare type Ul = Element<'ul'>;
  declare type Var = Element<'var'>;
  declare type Video = Element<'video'>;
  declare type Wbr = Element<'wbr'>;
  declare type Circle = Element<'circle'>;
  declare type ClipPath = Element<'clipPath'>;
  declare type Defs = Element<'defs'>;
  declare type Ellipse = Element<'ellipse'>;
  declare type G = Element<'g'>;
  declare type Image = Element<'image'>;
  declare type Line = Element<'line'>;
  declare type LinearGradient = Element<'linearGradient'>;
  declare type Mask = Element<'mask'>;
  declare type Path = Element<'path'>;
  declare type Pattern = Element<'pattern'>;
  declare type Polygon = Element<'polygon'>;
  declare type Polyline = Element<'polyline'>;
  declare type RadialGradient = Element<'radialGradient'>;
  declare type Rect = Element<'rect'>;
  declare type Stop = Element<'stop'>;
  declare type Svg = Element<'svg'>;
  declare type Text = Element<'text'>;
  declare type Tspan = Element<'tspan'>;

}