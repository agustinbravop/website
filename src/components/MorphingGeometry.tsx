import { useEffect, useRef } from "react";

type Vec2 = [number, number];
type NodeShape = "dot" | "user" | "system" | "db";

// Maximum nodes across all formations — inactive nodes collapse to formation.collapse
const MAX_N = 63;

// Grid helpers — used to build the hero formation
function gridNodes(xs: number[], ys: number[]): Vec2[] {
  const out: Vec2[] = [];
  for (const y of ys) for (const x of xs) out.push([x, y]);
  return out;
}
function gridConns(cols: number, rows: number): [number,number][] {
  const out: [number,number][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols - 1; c++)
      out.push([r * cols + c, r * cols + c + 1]);
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows - 1; r++)
      out.push([r * cols + c, (r + 1) * cols + c]);
  return out;
}

interface Formation {
  nodes: Vec2[];
  collapse: Vec2;
  connections: [number, number][];
}

interface Cfg {
  drawNodes: boolean;
  curves: boolean;
  pulse: boolean;
  workflow: boolean;
  nodeShapes?: NodeShape[];
}

// ─── FORMATIONS ──────────────────────────────────────────────────────────────
// Coordinates: canvas-absolute [0,1] where (0,0)=top-left, (1,1)=bottom-right.

const FORMATIONS: Formation[] = [

  // 0: HERO — 9×7 grid (63 nodes). Outer nodes off-screen; canvas clips the perimeter
  // so the grid appears to extend infinitely. 7 visible vertical + 5 visible horizontal
  // interior lines → 8×6 = 48 cells (4× the original 12).
  {
    nodes: gridNodes(
      [-0.07, 0.125, 0.25, 0.375, 0.50, 0.625, 0.75, 0.875, 1.07], // 9 x-positions
      [-0.07, 0.167, 0.333, 0.50, 0.667, 0.833, 1.07]               // 7 y-positions
    ),
    collapse: [0.50, 0.50],
    connections: gridConns(9, 7),
  },

  // 1: ABOUT — top-down system architecture: user → server → database (9 nodes).
  {
    nodes: [
      // Users — left column (0-2)
      [0.47,0.24],[0.47,0.50],[0.47,0.76],
      // Gateway + servers — center column (3-5)
      [0.67,0.50],[0.80,0.33],[0.80,0.67],
      // Databases — right column (6-8)
      [0.94,0.24],[0.94,0.50],[0.94,0.76],
    ],
    collapse: [0.70, 0.50],
    connections: [
      [0,3],[1,3],[2,3],     // users → gateway
      [3,4],[3,5],           // gateway → servers
      [4,6],[4,7],[5,7],[5,8], // servers → databases
    ],
  },

  // 2: EXPERIENCE — decision tree, centered, grows from root with scroll (12 nodes).
  {
    nodes: [
      [0.50,0.09],                                                 // 0 root
      [0.28,0.30],[0.72,0.30],                                     // 1,2 L2
      [0.14,0.53],[0.38,0.53],[0.62,0.53],[0.86,0.53],             // 3-6 L3
      [0.08,0.76],[0.25,0.76],[0.41,0.76],[0.59,0.76],[0.76,0.76], // 7-11 L4
    ],
    collapse: [0.50, 0.09],
    connections: [
      [0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[4,9],[5,10],[6,11],
    ],
  },

  // 3: STACK — bipartite graph, users ↔ systems (10 nodes). Curved connections.
  {
    nodes: [
      // Users — left column (0-4)
      [0.47,0.16],[0.47,0.33],[0.47,0.50],[0.47,0.67],[0.47,0.84],
      // Systems — right column (5-9)
      [0.91,0.16],[0.91,0.33],[0.91,0.50],[0.91,0.67],[0.91,0.84],
    ],
    collapse: [0.69, 0.50],
    connections: [
      [0,8],[0,6],[1,5],[1,7],[2,6],[2,8],[3,7],[3,9],[4,8],[4,6],
    ],
  },

  // 4: PROJECTS — workflow pipeline with packages traveling along edges (10 nodes).
  {
    nodes: [
      [0.46,0.28],[0.58,0.28],[0.70,0.28],[0.82,0.28],[0.93,0.28], // 0-4 pipeline
      [0.70,0.46],                                                    // 5 branch point
      [0.60,0.62],[0.80,0.62],                                       // 6,7 branches
      [0.60,0.80],[0.80,0.80],                                       // 8,9 deploys
    ],
    collapse: [0.70, 0.50],
    connections: [
      [0,1],[1,2],[2,3],[3,4],
      [2,5],[5,6],[5,7],[6,8],[7,9],
    ],
  },

  // 5: CONTACT — concentric radial broadcast (15 nodes).
  {
    nodes: [
      // Center (0)
      [0.69, 0.50],
      // Inner ring — 6 nodes at 60° intervals (~120px radius on 1920×1080)
      [0.690, 0.389], [0.745, 0.444], [0.745, 0.556],
      [0.690, 0.611], [0.635, 0.556], [0.635, 0.444],
      // Outer ring — 8 nodes at 45° intervals (~250px radius)
      [0.690, 0.269], [0.782, 0.337], [0.820, 0.500],
      [0.782, 0.663], [0.690, 0.731], [0.598, 0.663],
      [0.560, 0.500], [0.598, 0.337],
    ],
    collapse: [0.69, 0.50],
    connections: [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],          // center → inner
      [1,2],[2,3],[3,4],[4,5],[5,6],[6,1],           // inner ring
      [1,7],[2,8],[3,10],[4,11],[5,12],[6,14],       // inner → outer (radial)
      [0,9],[0,13],                                  // center → right/left outer
      [7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,7], // outer ring
    ],
  },
];

// ─── PER-FORMATION CONFIG ─────────────────────────────────────────────────
const CFG: Cfg[] = [
  { drawNodes: false, curves: false, pulse: false, workflow: false },
  {
    drawNodes: true, curves: false, pulse: false, workflow: false,
    nodeShapes: ["user","user","user","system","system","system","db","db","db"],
  },
  { drawNodes: true,  curves: false, pulse: false, workflow: false },
  {
    drawNodes: true, curves: true, pulse: false, workflow: false,
    nodeShapes: ["user","user","user","user","user","system","system","system","system","system"],
  },
  { drawNodes: true,  curves: false, pulse: false, workflow: true  },
  { drawNodes: true,  curves: false, pulse: true,  workflow: false },
];

// ─── DECISION TREE EXPAND ────────────────────────────────────────────────────
const TREE_PARENTS: (number|null)[] = [null,0,0,1,1,2,2,3,3,4,5,6];
const TREE_REVEAL:  [number,number][] = [
  [0,0],
  [0.06,0.26],[0.06,0.26],
  [0.24,0.50],[0.24,0.50],[0.24,0.50],[0.24,0.50],
  [0.50,0.85],[0.50,0.85],[0.50,0.85],[0.50,0.85],[0.50,0.85],
];

function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

// ─── CUSTOM NODE RENDERERS ───────────────────────────────────────────────────
function drawUser(ctx: CanvasRenderingContext2D, x: number, y: number, a: number) {
  ctx.fillStyle   = `rgba(245,158,11,${a * 0.85})`;
  ctx.strokeStyle = `rgba(245,158,11,${a})`;
  ctx.shadowBlur  = 14;
  ctx.shadowColor = `rgba(245,158,11,${a * 0.6})`;
  ctx.lineWidth   = 1;
  // Head
  ctx.beginPath();
  ctx.arc(x, y - 5, 2.8, 0, Math.PI * 2);
  ctx.fill();
  // Shoulders (open arc)
  ctx.beginPath();
  ctx.arc(x, y + 2, 4.5, Math.PI, 0);
  ctx.stroke();
}

function drawSystem(ctx: CanvasRenderingContext2D, x: number, y: number, a: number) {
  ctx.fillStyle   = `rgba(245,158,11,${a * 0.18})`;
  ctx.strokeStyle = `rgba(245,158,11,${a})`;
  ctx.shadowBlur  = 14;
  ctx.shadowColor = `rgba(245,158,11,${a * 0.6})`;
  ctx.lineWidth   = 1;
  // Server body
  ctx.beginPath();
  ctx.rect(x - 6, y - 5, 12, 10);
  ctx.fill();
  ctx.stroke();
  // LED strips
  ctx.fillStyle = `rgba(245,158,11,${a * 0.9})`;
  ctx.fillRect(x - 3.5, y - 3, 4, 1.2);
  ctx.fillRect(x - 3.5, y,     4, 1.2);
}

function drawDB(ctx: CanvasRenderingContext2D, x: number, y: number, a: number) {
  ctx.fillStyle   = `rgba(245,158,11,${a * 0.15})`;
  ctx.strokeStyle = `rgba(245,158,11,${a})`;
  ctx.shadowBlur  = 14;
  ctx.shadowColor = `rgba(245,158,11,${a * 0.6})`;
  ctx.lineWidth   = 1;
  const rx = 6, ry = 2.2, h = 8;
  // Body sides
  ctx.beginPath();
  ctx.moveTo(x - rx, y - ry);
  ctx.lineTo(x - rx, y - ry + h);
  ctx.moveTo(x + rx, y - ry);
  ctx.lineTo(x + rx, y - ry + h);
  ctx.stroke();
  // Bottom ellipse
  ctx.beginPath();
  ctx.ellipse(x, y - ry + h, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Top ellipse (lid)
  ctx.beginPath();
  ctx.ellipse(x, y - ry, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

const SECTION_TO_IDX: Record<string, number> = {
  about: 1, experience: 2, stack: 3, projects: 4, contact: 5,
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function MorphingGeometry() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const pos        = useRef<Vec2[]>(Array.from({length: MAX_N}, () => [0.50, 0.50] as Vec2));
  const nodeOps    = useRef<number[]>(new Array(MAX_N).fill(0));
  const targetIdx  = useRef(0);
  const treeExpand = useRef(0);
  const rafId      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Init to hero formation
    const hero = FORMATIONS[0].nodes;
    for (let i = 0; i < MAX_N; i++) {
      pos.current[i] = [...(hero[i] ?? FORMATIONS[0].collapse)];
    }

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      const w   = canvas.width;
      const h   = canvas.height;
      const t   = performance.now() / 1000;
      const idx = targetIdx.current;
      const cfg = CFG[idx];
      const frm = FORMATIONS[idx];
      const cur = pos.current;
      ctx.clearRect(0, 0, w, h);

      // ── Build effective target (MAX_N positions) ──────────────────────
      const tgt: Vec2[] = Array.from({length: MAX_N}, (_, i) =>
        i < frm.nodes.length ? [...frm.nodes[i]] : [...frm.collapse]
      );

      // Decision tree expansion
      if (idx === 2) {
        const exp  = treeExpand.current;
        const tree = FORMATIONS[2].nodes;
        for (let i = 0; i < tree.length; i++) {
          const par = TREE_PARENTS[i];
          if (par === null) continue;
          const r = ss(TREE_REVEAL[i][0], TREE_REVEAL[i][1], exp);
          tgt[i] = [
            tree[par][0] + (tree[i][0] - tree[par][0]) * r,
            tree[par][1] + (tree[i][1] - tree[par][1]) * r,
          ];
        }
      }

      // ── Lerp positions ────────────────────────────────────────────────
      for (let i = 0; i < MAX_N; i++) {
        cur[i][0] += (tgt[i][0] - cur[i][0]) * 0.044;
        cur[i][1] += (tgt[i][1] - cur[i][1]) * 0.044;
      }

      // ── Per-node opacity lerp ─────────────────────────────────────────
      for (let i = 0; i < MAX_N; i++) {
        const show = cfg.drawNodes && i < frm.nodes.length ? 1 : 0;
        nodeOps.current[i] += (show - nodeOps.current[i]) * 0.032;
      }

      // ── Pixel coords with subtle breathing ────────────────────────────
      const pts: Vec2[] = cur.map(([nx, ny], i) => [
        (nx + Math.sin(t * 0.55 + i * 0.73) * 0.002) * w,
        (ny + Math.cos(t * 0.48 + i * 0.91) * 0.002) * h,
      ]);

      const conns = frm.connections;

      // ── Lines ──────────────────────────────────────────────────────────
      ctx.save();
      ctx.shadowBlur  = 10;
      ctx.shadowColor = "rgba(245,158,11,0.28)";
      ctx.strokeStyle = "rgba(245,158,11,0.20)";
      ctx.lineWidth   = 1;

      if (cfg.curves) {
        // Bezier — alternate bow direction for weaving bipartite look
        for (let ei = 0; ei < conns.length; ei++) {
          const [a, b] = conns[ei];
          const [ax,ay] = pts[a], [bx,by] = pts[b];
          const mx = (ax+bx)/2, my = (ay+by)/2;
          const dx = bx-ax, dy = by-ay;
          const len = Math.hypot(dx,dy) || 1;
          const sign = ei % 2 === 0 ? 1 : -1;
          const cpx = mx + (-dy/len) * len * 0.38 * sign;
          const cpy = my + ( dx/len) * len * 0.38 * sign;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.quadraticCurveTo(cpx, cpy, bx, by);
          ctx.stroke();
        }
      } else {
        for (const [a, b] of conns) {
          ctx.beginPath();
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
          ctx.stroke();
        }
      }
      ctx.restore();

      // ── Workflow packages ─────────────────────────────────────────────
      if (cfg.workflow) {
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(245,158,11,0.5)";
        for (let ei = 0; ei < conns.length; ei++) {
          const [a, b] = conns[ei];
          const [ax,ay] = pts[a], [bx,by] = pts[b];
          // Two packages per edge, offset in phase
          for (let p = 0; p < 2; p++) {
            const phase = ((t * 0.38 + ei * 0.19 + p * 0.52) % 1);
            const alpha = Math.sin(phase * Math.PI) * 0.75;
            ctx.fillStyle = `rgba(245,158,11,${alpha})`;
            ctx.fillRect(
              ax + (bx - ax) * phase - 2.5,
              ay + (by - ay) * phase - 2.5,
              5, 5
            );
          }
        }
        ctx.restore();
      }

      // ── Nodes ──────────────────────────────────────────────────────────
      const shapes = cfg.nodeShapes;
      for (let i = 0; i < MAX_N; i++) {
        const a = nodeOps.current[i];
        if (a < 0.01) continue;
        const [px, py] = pts[i];
        const shape = shapes?.[i] ?? "dot";

        if (shape === "user") {
          drawUser(ctx, px, py, a);
        } else if (shape === "system") {
          drawSystem(ctx, px, py, a);
        } else if (shape === "db") {
          drawDB(ctx, px, py, a);
        } else {
          ctx.save();
          ctx.shadowBlur  = 18;
          ctx.shadowColor = `rgba(245,158,11,${0.7 * a})`;
          ctx.fillStyle   = `rgba(245,158,11,${0.75 * a})`;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Contact pulse rings ────────────────────────────────────────────
      if (cfg.pulse) {
        const centerA = nodeOps.current[0];
        if (centerA > 0.1) {
          const [cx, cy] = pts[0];
          const maxR = Math.min(w, h) * 0.22;
          ctx.save();
          ctx.shadowBlur = 0;
          // 5 rings at different phases for dense pulsing
          for (let ring = 0; ring < 5; ring++) {
            const phase = ((t * 0.42 + ring * 0.20) % 1);
            const r     = phase * maxR;
            const alpha = Math.pow(1 - phase, 1.6) * 0.38 * centerA;
            ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
            ctx.lineWidth   = 1.2;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    // ── Section detection ─────────────────────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = SECTION_TO_IDX[e.target.id];
            if (i !== undefined) targetIdx.current = i;
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    Object.keys(SECTION_TO_IDX).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // ── Scroll: hero reset + experience tree growth ───────────────────────
    const onScroll = () => {
      if (window.scrollY < 80) targetIdx.current = 0;

      if (targetIdx.current === 2) {
        const el = document.getElementById("experience");
        if (el) {
          const scrollable = el.offsetHeight - window.innerHeight;
          treeExpand.current = scrollable > 50
            ? Math.max(0, Math.min(1, -el.getBoundingClientRect().top / scrollable))
            : 0.5;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
