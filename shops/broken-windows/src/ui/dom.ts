export function getEl<T extends HTMLElement>(selector: string, root: ParentNode = document): T {
    const element: T | null = root.querySelector<T>(selector);
    if (!element) {
        throw new Error("index.html is missing an element: " + selector);
    }
    return element;
}

export function getNth<T extends HTMLElement>(selector: string, index: number): T {
    const element: T | undefined = document.querySelectorAll<T>(selector)[index];
    if (!element) {
        throw new Error("index.html is missing element number " + index + " of: " + selector);
    }
    return element;
}

export function getClosest<T extends HTMLElement>(start: Element, selector: string): T {
    const element: T | null = start.closest<T>(selector);
    if (!element) {
        throw new Error("index.html is missing a parent element: " + selector);
    }
    return element;
}