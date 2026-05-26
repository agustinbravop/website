import * as React from "react";

const AboutMeContent = () => {
  const [animateOnLoad, setAnimateOnLoad] = React.useState(false);

  React.useEffect(() => {
    const startTimer = setTimeout(() => setAnimateOnLoad(true), 500);
    const stopTimer = setTimeout(() => setAnimateOnLoad(false), 1000);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div className="flex text-gray-200 gap-2 flex-col">
      <p>
        <span
          className={`bg-teal-500/25 highlight-card inline-block relative overflow-hidden border border-teal-500/50 px-0.5 align-top ${animateOnLoad ? "animate-on-load" : ""}`}
        >
          AI-native, product-minded software engineer
        </span>{" "}
        with experience building full-stack applications and cloud-native
        platforms.
      </p>
      <p>
        I work across the entire stack to deliver reliable systems that create
        real business impact. I take end-to-end ownership, thrive in ambiguity,
        and understand how customer needs, product strategy, and technical
        decisions intersect.
      </p>
      <p>
        I ramp up quickly and do my best work in fast-paced startups where
        ambitious teams build high-impact products.
      </p>
    </div>
  );
};

export default AboutMeContent;
