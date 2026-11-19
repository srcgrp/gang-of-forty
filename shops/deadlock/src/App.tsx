import { useThemeStore } from "./hooks/useThemeStore";
import HomePage from "./components/pages/HomePage";

export default function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="app" data-theme={theme}>
      <HomePage />
    </div>
  );
}
