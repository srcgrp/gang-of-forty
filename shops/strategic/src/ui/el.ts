/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

type ElementProps = Record<string, string | number | boolean | null | undefined>;
type Child = Node | string | number | false | null | undefined;
type Children = Child | readonly Child[];

export function el<K extends keyof HTMLElementTagNameMap>(tag: K, props?: ElementProps, children?: Children): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (props) {
    for (const key in props) {
      const value = props[key];
      if (value === undefined || value === null || value === false) continue;
      if (key === 'class') node.className = String(value);
      else if (key === 'text') node.textContent = String(value);
      else node.setAttribute(key, value === true ? '' : String(value));
    }
  }
  if (children !== undefined) {
    const childList: readonly Child[] = Array.isArray(children) ? children : [children];
    for (const child of childList) {
      if (child === null || child === undefined || child === false) continue;
      if (child instanceof Node) node.append(child);
      else node.append(document.createTextNode(String(child)));
    }
  }
  return node;
}