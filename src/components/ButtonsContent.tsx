import { useAppContext } from "../context/AppContext";

const ButtonsContent = () => {
  const { setIsPortfolioModalOpen } = useAppContext();

  return (
    <div className="flex gap-3 px-4">
      <div className="relative flex-1 rounded group">
        <div
          className="absolute inset-0 rounded border border-teal-500/40 group-hover:border-teal-500/80 animate-[shimmer_5s_linear_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.5) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
        <button
          onClick={() => setIsPortfolioModalOpen(true)}
          className="relative w-full py-2 px-4 bg-[#1C1C1C]/80 text-gray-300 hover:text-teal-400 font-medium text-md rounded transition-all cursor-pointer border border-teal-500/20 active:scale-[0.97] duration-75"
        >
          See portfolio
        </button>
      </div>
      <div className="relative flex-1 rounded group">
        <div
          className="absolute inset-0 rounded border border-white/70 group-hover:border-white/50 animate-[shimmer_5s_linear_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
        <a
          href="/AgustinBravo_Resume.pdf"
          download
          className="relative block w-full py-2 px-4 bg-[#1C1C1C]/80 text-gray-300 hover:text-white font-medium text-md rounded transition-all text-center cursor-pointer border border-white/60 active:scale-[0.97] duration-75"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download resume
          </span>
        </a>
      </div>
    </div>
  );
};

export default ButtonsContent;
