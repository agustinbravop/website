import { useRef, useState, useLayoutEffect } from "react";
import Scene from "./components/Scene";
import Panel from "./components/Panel";
import PortfolioModal from "./components/PortfolioModal";
import { useAppContext } from "./context/AppContext";

function App() {
  const { state } = useAppContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-[#1a1a1a] text-white font-sans overflow-hidden">
      <Scene />

      <header
        ref={headerRef}
        className="absolute top-0 left-0 right-0 p-4 bg-transparent z-20 flex justify-between items-center"
      >
        <div className="flex items-baseline gap-3">
          <p className="text-sm text-gray-400">Software Engineer</p>
          <h1 className="text-xl font-bold">Agustín Bravo</h1>
        </div>
        <div className="flex gap-4 text-sm">
          <a
            href="mailto:agustinbravop1@gmail.com"
            className="text-gray-400 hover:text-white"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/agustinbravop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/agustinbravop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.x.com/agustinbravop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Twitter
          </a>
        </div>
      </header>

      <main className="relative w-full h-full z-10">
        {state.nodes.map((node) => (
          <Panel
            key={node.id}
            id={node.id}
            label={node.data.label}
            content={node.data.content}
            initialPosition={node.position}
            width={node.data.width}
            zIndex={node.zIndex}
            headerHeight={headerHeight}
          />
        ))}
      </main>

      <PortfolioModal />
    </div>
  );
}

export default App;
