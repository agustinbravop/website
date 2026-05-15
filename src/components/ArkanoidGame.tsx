import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";

const BALL_RADIUS = 7;
const BALL_SPEED = 14;
const PADDLE_WIDTH = 120;
const PADDLE_HEIGHT = 10;
const PADDLE_Y_OFFSET = 40;
const BUTTON_BOTTOM = PADDLE_Y_OFFSET + 35;
const MAX_ANGLE_DEG = 60;

type GameState = "idle" | "playing";

export default function ArkanoidGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [bounces, setBounces] = useState(0);
  const [record, setRecord] = useState(() =>
    parseInt(localStorage.getItem("arkanoid-record") ?? "0", 10),
  );

  const gameStateRef = useRef<GameState>("idle");
  const bouncesRef = useRef(0);
  const recordRef = useRef(record);
  const spawnRef = useRef<(() => void) | null>(null);

  // Helpers that only touch stable refs and state setters — safe outside the effect.
  const setGame = (next: GameState) => {
    gameStateRef.current = next;
    setGameState(next);
  };

  const addBounce = () => {
    bouncesRef.current++;
    setBounces(bouncesRef.current);
  };

  const resetBounces = () => {
    bouncesRef.current = 0;
    setBounces(0);
  };

  const saveRecord = () => {
    if (bouncesRef.current > recordRef.current) {
      recordRef.current = bouncesRef.current;
      localStorage.setItem("arkanoid-record", String(recordRef.current));
      setRecord(recordRef.current);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let paddleX = window.innerWidth / 2;
    let bx = 0,
      by = 0,
      vx = 0,
      vy = 0;
    let rafId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      paddleX = e.clientX;
    };
    window.addEventListener("mousemove", onMouseMove);

    const spawn = () => {
      bx = window.innerWidth / 2;
      by = window.innerHeight - BUTTON_BOTTOM - 100;
      const angle = (15 * Math.PI) / 180;
      vx = BALL_SPEED * Math.sin(angle);
      vy = -BALL_SPEED * Math.cos(angle);
    };
    spawnRef.current = spawn;

    const onDrop = () => {
      saveRecord();
      resetBounces();
      spawn();
    };

    const getPanelRects = (): DOMRect[] =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-panel]")).map(
        (el) => el.getBoundingClientRect(),
      );

    const getHeaderBottom = (): number =>
      document.querySelector("header")?.getBoundingClientRect().bottom ?? 60;

    // Circle-AABB: reflects velocity off the surface normal and pushes the
    // ball out of overlap. Returns true if a bounce occurred.
    const resolveRect = (rect: DOMRect): boolean => {
      const closestX = Math.max(rect.left, Math.min(bx, rect.right));
      const closestY = Math.max(rect.top, Math.min(by, rect.bottom));
      const dx = bx - closestX;
      const dy = by - closestY;
      const distSq = dx * dx + dy * dy;

      if (distSq >= BALL_RADIUS * BALL_RADIUS) return false;

      if (distSq === 0) {
        // Ball center inside rect — eject through the nearest edge.
        const dLeft = bx - rect.left,
          dRight = rect.right - bx;
        const dTop = by - rect.top,
          dBottom = rect.bottom - by;
        const minD = Math.min(dLeft, dRight, dTop, dBottom);
        if (minD === dLeft) {
          bx = rect.left - BALL_RADIUS;
          vx = -Math.abs(vx);
        } else if (minD === dRight) {
          bx = rect.right + BALL_RADIUS;
          vx = Math.abs(vx);
        } else if (minD === dTop) {
          by = rect.top - BALL_RADIUS;
          vy = -Math.abs(vy);
        } else {
          by = rect.bottom + BALL_RADIUS;
          vy = Math.abs(vy);
        }
        return true;
      }

      const dist = Math.sqrt(distSq);
      const nx = dx / dist;
      const ny = dy / dist;
      bx += nx * (BALL_RADIUS - dist);
      by += ny * (BALL_RADIUS - dist);

      const dot = vx * nx + vy * ny;
      if (dot < 0) {
        vx -= 2 * dot * nx;
        vy -= 2 * dot * ny;
        return true;
      }
      return false;
    };

    const drawPaddle = (paddleY: number) => {
      ctx.beginPath();
      ctx.roundRect(
        paddleX - PADDLE_WIDTH / 2,
        paddleY,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        3,
      );
      ctx.fillStyle = "rgba(0, 187, 167, 0.35)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 187, 167, 1)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(bx, by, BALL_RADIUS * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx, by, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();
    };

    const update = (W: number, H: number) => {
      const headerBottom = getHeaderBottom();
      const paddleY = H - PADDLE_Y_OFFSET;

      bx += vx;
      by += vy;

      // Screen edges
      if (bx - BALL_RADIUS < 0) {
        vx = Math.abs(vx);
        bx = BALL_RADIUS;
        addBounce();
      }
      if (bx + BALL_RADIUS > W) {
        vx = -Math.abs(vx);
        bx = W - BALL_RADIUS;
        addBounce();
      }
      if (by - BALL_RADIUS < headerBottom) {
        vy = Math.abs(vy);
        by = headerBottom + BALL_RADIUS;
        addBounce();
      }

      // Panels
      for (const rect of getPanelRects()) {
        if (resolveRect(rect)) addBounce();
      }

      // Paddle: same circle-AABB, but reflection is overridden with angle control.
      const paddleLeft = paddleX - PADDLE_WIDTH / 2;
      const paddleRight = paddleX + PADDLE_WIDTH / 2;
      const cpx = Math.max(paddleLeft, Math.min(bx, paddleRight));
      const cpy = Math.max(paddleY, Math.min(by, paddleY + PADDLE_HEIGHT));
      if ((bx - cpx) ** 2 + (by - cpy) ** 2 < BALL_RADIUS ** 2 && vy > 0) {
        const rel = Math.max(
          -1,
          Math.min(1, (bx - paddleX) / (PADDLE_WIDTH / 2)),
        );
        const angle = (rel * MAX_ANGLE_DEG * Math.PI) / 180;
        vx = BALL_SPEED * Math.sin(angle);
        vy = -BALL_SPEED * Math.cos(angle);
        by = paddleY - BALL_RADIUS;
        addBounce();
      }

      if (by - BALL_RADIUS > H) onDrop();

      drawPaddle(paddleY);
      drawBall();
    };

    const loop = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);
      if (gameStateRef.current === "playing") update(W, H);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const toggle = () => {
    if (gameStateRef.current === "idle") {
      spawnRef.current?.();
      resetBounces();
      setGame("playing");
    } else {
      setGame("idle");
    }
  };

  const shimmerStyle =
    gameState === "idle"
      ? {
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }
      : { background: "rgba(255,255,255,0.1)" };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 15,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: `${BUTTON_BOTTOM}px`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 16,
          pointerEvents: "none",
        }}
        className="flex items-center gap-3"
      >
        {gameState === "playing" && (
          <span className="text-sm text-gray-400 font-sans [text-shadow:0_2px_8px_rgba(0,0,0,1),0_2px_8px_rgba(0,0,0,1)]">
            Bounces: {bounces}
          </span>
        )}
        <div
          className="rounded-full p-px animate-[shimmer_5s_linear_infinite]"
          style={shimmerStyle}
        >
          <button
            onClick={toggle}
            style={{ pointerEvents: "auto" }}
            className="flex items-center gap-2 p-5 h-8 rounded-full bg-[#1C1C1C] text-gray-400 hover:text-white hover:cursor-pointer backdrop-blur-sm text-sm font-sans"
          >
            {gameState === "idle" ? (
              <>
                <Play className="w-4 h-4 fill-current" />
                Play a minigame
              </>
            ) : (
              <>
                <Square className="w-4 h-4 fill-current" />
                Stop
              </>
            )}
          </button>
        </div>
        {gameState === "playing" && (
          <span className="text-sm text-gray-400 font-sans [text-shadow:0_2px_8px_rgba(0,0,0,1),0_2px_8px_rgba(0,0,0,1)]">
            Highest: {record}
          </span>
        )}
      </div>
    </>
  );
}
