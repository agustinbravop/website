import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINES = [
  { text: "> Agustín Bravo",                 className: "text-zinc-50  text-2xl sm:text-3xl md:text-4xl font-semibold" },
  { text: "> Software Engineer.",             className: "text-zinc-300 text-xl  sm:text-2xl md:text-3xl" },
  { text: "> Product-minded. Startup-paced.", className: "text-zinc-400 text-xl  sm:text-2xl md:text-3xl" },
  { text: "> I build solutions that matter.", className: "text-amber-400 text-xl sm:text-2xl md:text-3xl font-medium" },
];

const CYCLING_WORDS = ["solutions", "systems", "software"];

// The suffix the cursor rewinds through before cycling begins
const REWIND_SUFFIX = " that matter.";
// Prefix that remains after rewind — must equal LINES[3].text minus REWIND_SUFFIX
const WORD_PREFIX   = "> I build ";

const CHAR_DELAY = 42;
const LINE_PAUSE = 380;
const RETYPE_MS  = 55;   // ms per char for rewind + cycling
const IDLE_MS    = 2200; // pause between cycles

type CyclePhase = "idle" | "deleting" | "typing";

export default function HeroSection() {
  const [completedLines, setCompletedLines] = useState<typeof LINES>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDone, setIsDone] = useState(false);

  // Rewind phase — deletes REWIND_SUFFIX char by char before cycling
  const [rewinding, setRewinding] = useState(false);
  const [suffix, setSuffix]       = useState(REWIND_SUFFIX);

  // Cycling phase
  const [cycling, setCycling]         = useState(false);
  const [displayedWord, setDisplayedWord] = useState("solutions");
  const [wordIdx, setWordIdx]         = useState(0);
  const [cyclePhase, setCyclePhase]   = useState<CyclePhase>("idle");

  // ── Typewriter ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (currentLineIndex >= LINES.length) { setIsDone(true); return; }
    const target = LINES[currentLineIndex].text;
    if (currentText.length < target.length) {
      const t = setTimeout(() =>
        setCurrentText(target.slice(0, currentText.length + 1)), CHAR_DELAY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCompletedLines(prev => [...prev, LINES[currentLineIndex]]);
      setCurrentText("");
      setCurrentLineIndex(prev => prev + 1);
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [currentLineIndex, currentText]);

  // ── Start rewind 900ms after typewriter finishes ───────────────────────────
  useEffect(() => {
    if (!isDone) return;
    const t = setTimeout(() => setRewinding(true), 900);
    return () => clearTimeout(t);
  }, [isDone]);

  // ── Rewind: delete one char from right of suffix ───────────────────────────
  useEffect(() => {
    if (!rewinding || cycling) return;
    if (suffix.length === 0) { setCycling(true); return; }
    const t = setTimeout(() => setSuffix(s => s.slice(0, -1)), RETYPE_MS);
    return () => clearTimeout(t);
  }, [rewinding, suffix, cycling]);

  // ── Cycling idle: wait, then start deleting ────────────────────────────────
  useEffect(() => {
    if (!cycling || cyclePhase !== "idle") return;
    const t = setTimeout(() => setCyclePhase("deleting"), IDLE_MS);
    return () => clearTimeout(t);
  }, [cycling, cyclePhase]);

  // ── Cycling deleting: erase word char by char ──────────────────────────────
  useEffect(() => {
    if (cyclePhase !== "deleting") return;
    if (displayedWord.length === 0) {
      setWordIdx(prev => (prev + 1) % CYCLING_WORDS.length);
      setCyclePhase("typing");
      return;
    }
    const t = setTimeout(() => setDisplayedWord(w => w.slice(0, -1)), RETYPE_MS);
    return () => clearTimeout(t);
  }, [cyclePhase, displayedWord]);

  // ── Cycling typing: add one char at a time ─────────────────────────────────
  useEffect(() => {
    if (cyclePhase !== "typing") return;
    const target = CYCLING_WORDS[wordIdx];
    if (displayedWord.length >= target.length) { setCyclePhase("idle"); return; }
    const t = setTimeout(() =>
      setDisplayedWord(target.slice(0, displayedWord.length + 1)), RETYPE_MS);
    return () => clearTimeout(t);
  }, [cyclePhase, displayedWord, wordIdx]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-[38vh]">
        <div className="font-mono space-y-3">
          {completedLines.map((line, i) => {
            const isLast = isDone && i === completedLines.length - 1;

            // ── Cycling: word + cursor + suffix (no leading space — cursor is separator)
            if (isLast && cycling) {
              return (
                <p key={i} className={line.className}>
                  {WORD_PREFIX}
                  {displayedWord}
                  <span className="cursor-blink text-amber-400">▋</span>
                  {"that matter."}
                </p>
              );
            }

            // ── Rewinding: cursor walks back through suffix
            if (isLast && rewinding) {
              return (
                <p key={i} className={line.className}>
                  {WORD_PREFIX}{"solutions"}
                  {suffix}
                  <span className="cursor-blink text-amber-400">▋</span>
                </p>
              );
            }

            // ── Static last line (just finished typing, pre-rewind)
            return (
              <p key={i} className={line.className}>
                {line.text}
                {isLast && (
                  <span className="cursor-blink text-amber-400 ml-0.5">▋</span>
                )}
              </p>
            );
          })}

          {currentLineIndex < LINES.length && (
            <p className={LINES[currentLineIndex].className}>
              {currentText}
              <span className="cursor-blink text-amber-400">▋</span>
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-12 flex items-center gap-6"
        >
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-zinc-950 text-sm font-semibold rounded hover:bg-amber-400 transition-colors"
          >
            Explore my work
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="/AgustinBravo_Resume.pdf"
            download
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Download resume
          </a>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
      />
    </section>
  );
}
