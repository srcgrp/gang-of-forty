import { formatNumber } from "./formatting";

export function createSearchResultsList(
    input: HTMLInputElement
): HTMLUListElement {
    const resultsList: HTMLUListElement = document.createElement("ul");
    resultsList.classList.add("search-results");
    input.insertAdjacentElement("afterend", resultsList);
    return resultsList;
}

export function renderSearchResults(
    list: HTMLUListElement,
    names: string[]
): void {
    list.replaceChildren();

    if (names.length === 0) {
        const li: HTMLLIElement = document.createElement("li");
        li.classList.add("message");
        li.textContent = "محصول یافت نشد";
        list.append(li);
        return;
    }

    names.forEach(name => {
        const li: HTMLLIElement = document.createElement("li");
        li.textContent = name;
        list.append(li);
    });
}

export function renderSearchPlaceholder(
    input: HTMLInputElement,
    count: number
): void {
    input.placeholder = `جستجو در میان ${formatNumber(count)} کالا…`;
}

export function attachSearchListeners(
    input: HTMLInputElement,
    form: HTMLFormElement,
    getResults: (query: string) => string[],
    resultsList: HTMLUListElement
): void {
    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();
    });

    input.addEventListener("input", () => {
        const query = input.value.trim();

        if (query === "") {
            resultsList.replaceChildren();
            return;
        }

        renderSearchResults(resultsList, getResults(query));
    });
}