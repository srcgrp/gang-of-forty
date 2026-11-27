import { forwardRef, type ReactNode } from "react";

type MainContentProps = { children: ReactNode };

const MainContent = forwardRef<HTMLElement, MainContentProps>(
  function MainContent({ children }, ref) {
    return (
      <main id="main-content" tabIndex={-1} ref={ref}>
        {children}
      </main>
    );
  },
);

export default MainContent;
