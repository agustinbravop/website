import { motion } from "framer-motion";
import SplitText from "./SplitText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-50 leading-[1.1] tracking-tighter max-w-4xl">
          <SplitText>Interface to infrastructure.</SplitText>
          <br></br>
          <SplitText className="text-zinc-500" delay={0.28}>
            I own the whole thing.
          </SplitText>
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xl text-zinc-300 leading-relaxed"
            style={{ maxWidth: "52ch" }}
          >
            AI-native, product-minded software engineer with experience building
            full-stack applications and cloud-native platforms. I take
            end-to-end ownership, thrive in ambiguity, and understand how
            customer needs, product strategy, and technical decisions intersect.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-xl text-zinc-300 leading-relaxed"
            style={{ maxWidth: "52ch" }}
          >
            I do my best work in fast-paced startups where ambitious teams build
            high-impact products.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
