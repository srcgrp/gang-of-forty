import type { Category } from "../types"; // import only the type

type Props = { // the props this component receives
  categories: Category[]; // list of categories to draw
  activeId: number | null; // the selected category id, or null
  onPick: (id: number) => void; // tells App which category was clicked
};

export default function CategoryNav({ categories, activeId, onPick }: Props) {
  return (
    <section className="categories" id="categories">
      <h2 className="items-header">دسته بندی ها</h2>
      <div className="all-items" id="categories-grid">
               { /* key must be unique among siblings, so React can track each tile*/ }

           {categories.map((c) => (
          <div className="items" key={c.id}>
         { /*A button, because this only does an action and does not navigate*/ }
            <button
              type="button" 
              className={`items-link${c.id === activeId ? " active" : ""}`} 
              aria-pressed={c.id === activeId} /* tells screen readers if it is selected*/
              onClick={() => onPick(c.id)} /* report the click to App*/ 
            >
            
              <span aria-hidden="true" className="items-icon">{c.emoji}</span>
         <p className="items-title">{c.name}</p>
            </button>
          </div>
        ))}
      </div>
    </section>
);
}