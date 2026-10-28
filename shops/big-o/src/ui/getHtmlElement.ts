// Get html element and return error if it doesn't exist.
export function getHtmlElement<Type extends Element>(selector: string, parent: ParentNode = document): Type {
    const element = parent.querySelector<Type>(selector);
    if (element === null) throw new Error(`The ${selector} selector doesn't exist.`)
    return element;
}