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
        I&apos;m an{" "}
        <span
          className={`bg-teal-500/25 highlight-card inline-block relative overflow-hidden border border-teal-500/50 px-0.5 align-top ${animateOnLoad ? "animate-on-load" : ""}`}
        >
          AI-native, product-minded software engineer
        </span>{" "}
        experienced in building full-stack applications and scalable
        cloud-native platforms.
      </p>
      <p>
        I work across the entire tech stack to deliver scalable, maintainable
        systems. I&apos;m a generalist that takes end-to-end ownership of
        complex problems to deliver practical, thoughtful solutions.
      </p>
      <p>
        I genuinely thrive working with ambitious teams in fast-paced
        environments building high-impact products.
      </p>
    </div>
  );
};

export default AboutMeContent;
