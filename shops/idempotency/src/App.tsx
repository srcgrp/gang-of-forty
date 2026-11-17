import HomePage from "./components/HomePage";
import { useThemeStore } from "./hooks/useThemeStore";
export default function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="app-shell" data-theme={theme}>
      <HomePage />
    </div>
  );
}
