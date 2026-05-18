const educations = [
  {
    title: "B.S. in Information Systems Engineering",
    institution: "Universidad Tecnológica Nacional, Argentina",
    date: "2021 - 2025",
    description: "Graduated with academic honors (2nd highest GPA in cohort).",
  },
  {
    title: "Certified Tech Developer",
    institution: "Digital House, Argentina",
    date: "2021 - 2022",
  },
];

const EducationContent = () => {
  return (
    <div className="flex flex-col gap-4">
      {educations.map((edu, index) => (
        <div key={index}>
          <h2 className="text-lg font-bold text-white">{edu.title}</h2>
          <div className="flex flex-wrap justify-between">
            <p className="text-sm italic flex-1 min-w-0">{edu.institution}</p>
            <p className="text-sm text-gray-400 shrink-0 ml-2">{edu.date}</p>
          </div>
          {edu.description && (
            <p className="text-sm text-gray-200">{edu.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EducationContent;
