import { lazy, Suspense, useRef } from "react";
import Panel from "./components/Panel";
import MobileAccordion from "./components/MobileAccordion";
import PortfolioModal from "./components/PortfolioModal";
import { useAppContext } from "./context/AppContext";
import { useWindowSize } from "./hooks/useWindowSize";

const Scene = lazy(() => import("./components/Scene"));
const ArkanoidGame = lazy(() => import("./components/ArkanoidGame"));

const PANEL_ORDER = ["about", "skills", "experience", "education", "buttons"];

function App() {
  const { state } = useAppContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const [windowWidth] = useWindowSize();

  const isMobile = windowWidth < 768;
  const isWideEnough = windowWidth >= 1024;

  const orderedNodes = PANEL_ORDER.map((id) =>
    state.nodes.find((node) => node.id === id),
  ).filter(Boolean);

  return (
    <div className="h-screen w-screen bg-[#1a1a1a] text-white font-sans overflow-hidden">
      {!isMobile && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      {isWideEnough && (
        <Suspense fallback={null}>
          <ArkanoidGame />
        </Suspense>
      )}

      <header
        ref={headerRef}
        className="absolute top-0 left-0 right-0 p-3 sm:p-4 backdrop-blur-sm z-20 flex justify-between items-center"
      >
        <div className="flex items-baseline gap-3">
          <p className="text-gray-400 hidden sm:inline">Software Engineer</p>
          <h1 className="text-xl font-bold">Agustín Bravo</h1>
        </div>
        <nav
          aria-label="Social links"
          className="flex gap-2 sm:gap-4 text-sm sm:text-base pt-1.5 sm:pt-1"
        >
          <a
            href="https://www.linkedin.com/in/agustinbravop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white hover:underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/agustinbravop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white hover:underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href="https://www.x.com/agustinbravop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white hover:underline underline-offset-4"
          >
            Twitter
          </a>
          <a
            href="mailto:agustinbravop1@gmail.com"
            className="text-gray-400 hover:text-white hover:underline underline-offset-4"
          >
            Email
          </a>
        </nav>
      </header>

      <main className="relative w-full h-full z-10">
        {isMobile ? (
          <div className="w-full h-full overflow-y-auto px-4 py-20">
            <MobileAccordion
              items={orderedNodes.map((node) => ({
                id: node!.id,
                label: node!.data.label,
                content: node!.data.content,
              }))}
            />
          </div>
        ) : (
          state.nodes.map((node) => (
            <Panel
              key={node.id}
              id={node.id}
              label={node.data.label}
              content={node.data.content}
              initialPosition={node.position}
              width={node.data.width}
              zIndex={node.zIndex}
            />
          ))
        )}
      </main>

      <PortfolioModal />
    </div>
  );
}

export default App;
