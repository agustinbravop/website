const experiences = [
  {
    title: "Engineering Intern",
    company: "ECOM Chaco S.A.",
    date: "Jun 2025 - Nov 2025",
    highlight: "Ramped to senior-level productivity within two months.",
    description: [
      "Migrated over 50 services to Kubernetes.",
      "Built a full-stack app as the internal portal of our infrastructure self-service system.",
      "Implemented a data pipeline to prove our team's business impact with data-driven insights.",
      "Improved tooling to reduce deployment times from days to minutes across four teams.",
      "Deployed observability with Prometheus and Grafana for 100+ apps.",
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    company: "Universidad Tecnológica Nacional",
    date: "Apr 2023 – Nov 2025",
    description: [
      "Worked on three interdisciplinary research projects.",
      "Applied data science techniques to predict key parameters affecting water treatment efficiency.",
      "Contributed to a research project developing a security control framework for IoT networks.",
    ],
  },
];

const ExperienceContent = () => {
  return (
    <div className="flex flex-col gap-4">
      {experiences.map((exp, index) => (
        <div key={index}>
          <h3 className="text-lg font-bold text-white">{exp.title}</h3>
          <div className="flex justify-between align-middle">
            <p className="text-sm italic">{exp.company}</p>
            <p className="text-sm text-gray-400 mb-2">{exp.date}</p>
          </div>
          {exp.highlight && (
            <p className="bg-teal-500/25 highlight-card relative overflow-hidden border border-teal-500/50 px-1 py-0.5 text-gray-200 text-md">
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
