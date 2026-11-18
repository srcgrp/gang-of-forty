import ThemeFrame from "./ThemeFrame";
import CatalogProvider from "./CatalogProvider";
import LayoutContent from "./LayoutContent";

export default function Layout() {
  return <ThemeFrame><CatalogProvider><LayoutContent /></CatalogProvider></ThemeFrame>;
}
