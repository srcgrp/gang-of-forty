export function getPageElements() {
    const categoryList = document.querySelector<HTMLUListElement>(
        "#categories .category-list"
    );
    const dropDown = document.querySelector<HTMLUListElement>(
        ".dropdown-menu"
    );
    const footerCategories = document.querySelector<HTMLUListElement>(
        "footer .footer-categories"
    );
    const mainMenu = document.querySelector<HTMLUListElement>(
        ".main-nav > ul"
    );
    const helpList = document.querySelector<HTMLUListElement>(
        ".footer-help"
    );
    const hoursSection = document.querySelector<HTMLElement>(
        "#working-hours"
    );
    const hero = document.querySelector<HTMLElement>("#hero");
    const promo = document.querySelector<HTMLElement>("#promo");
    const banners = document.querySelector<HTMLElement>("#banners");
    const carouselsContainer = document.querySelector<HTMLElement>(
        "#carousels"
    );
    const searchInput = document.querySelector<HTMLInputElement>("#search");

    if (
        !categoryList ||
        !dropDown ||
        !footerCategories ||
        !mainMenu ||
        !helpList ||
        !hoursSection ||
        !hero ||
        !promo ||
        !banners ||
        !carouselsContainer ||
        !searchInput
    ) {
        throw new Error("index.html is missing an element");
    }

    return {
        categoryList,
        dropDown,
        footerCategories,
        mainMenu,
        helpList,
        hoursSection,
        hero,
        promo,
        banners,
        carouselsContainer,
        searchInput
    };
}

export type PageElements = ReturnType<typeof getPageElements>;