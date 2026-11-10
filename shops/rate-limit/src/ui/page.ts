export function convertPage(convert: (text: string) => string): void {
  const elements: NodeListOf<Element> = document.body.querySelectorAll("*");

  elements.forEach((element: Element) => {
    element.childNodes.forEach((child: ChildNode) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.nodeValue = convert(child.nodeValue ?? "");
      }
    });
  });
}
