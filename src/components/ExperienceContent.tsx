import * as React from "react";

const experiences = [
  {
    title: "Engineering Intern",
    company: "ECOM Chaco S.A.",
    date: "Jun 2025 - Nov 2025",
    highlight:
      "Quickly ramped up to become a key contributor across dev tooling and platform engineering within two months.",
    description: [
      "Built an entire full-stack app as the internal portal of our infrastructure self-service platform.",
      "Implemented a data pipeline to prove our team's business impact with data-driven insights.",
      "Improved CI/CD pipelines and infrastructure self-service tooling to reduce deployment times from days to minutes.",
      "Migrated over 50 live services to Kubernetes.",
      "Deployed observability with Prometheus and Grafana for 100+ apps.",
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    company: "Universidad Tecnológica Nacional",
    date: "Apr 2023 – Nov 2025",
    description: [
      "Collaborated on three interdisciplinary research projects.",
      "Co-authored and published two papers at national academic conferences.",
    ],
  },
];

const ExperienceContent = () => {
  const [animateOnLoad, setAnimateOnLoad] = React.useState(false);

  React.useEffect(() => {
    const startTimer = setTimeout(() => setAnimateOnLoad(true), 800);
    const stopTimer = setTimeout(() => setAnimateOnLoad(false), 1300);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {experiences.map((exp, index) => (
        <div key={index}>
          <h2 className="text-lg font-bold text-white">{exp.title}</h2>
          <div className="flex flex-wrap justify-between">
            <p className="text-sm italic flex-1 min-w-0">{exp.company}</p>
            <p className="text-sm text-gray-400 shrink-0 ml-2">{exp.date}</p>
          </div>
          {exp.highlight && (
            <p
              className={`bg-teal-500/25 highlight-card relative overflow-hidden border border-teal-500/50 px-1 mt-2 py-0.5 text-gray-200 text-md ${animateOnLoad ? "animate-on-load" : ""}`}
            >
              {exp.highlight}
            </p>
          )}
          <ul className="list-disc list-outside text-md ml-4 text-gray-200">
            {exp.description.map((item, i) => (
              <li key={i} className="mt-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceContent;
