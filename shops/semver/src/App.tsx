import Storefront from "./components/Storefront";
import { useThemeStore } from "./hooks/useThemeStore";

export default function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="app" data-theme={theme}>
      <Storefront />
    </div>
  );
}
