export default function CategoryNav() {
  return (
    <section id="header-categories">
      <ul id="btn-categories">
        <li className="has-dropdown">
          <details>
            <summary className="dropdown-toggle">
              <i className="ph ph-list"></i> همه دسته ها
            </summary>
            <ul className="dropdown-menu" id="dropdown-menu"></ul>
          </details>
        </li>
      </ul>
    </section>
  );
}
