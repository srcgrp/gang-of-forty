export default function SearchResults() {
    return (
        <section className="product-carousel" id="search-results" aria-labelledby="search-results-title" hidden>
            <header className="section-heading">
                <h2 id="search-results-title">نتایج جست‌وجو</h2>
            </header>
            <nav id="search-results-controls" className="carousel-controls" aria-label="کنترل‌های نتایج جست‌وجو">
                <a href="#search-results-first">اولین محصول →</a>
                <a href="#search-results-last">آخرین محصول ←</a>
            </nav>
            <p id="search-results-status" className="carousel-status" role="status" aria-live="polite"></p>
            <section id="search-results-track" className="product-track" tabIndex={0} aria-label="محصولات یافت‌شده"></section>
        </section>
    )
}
