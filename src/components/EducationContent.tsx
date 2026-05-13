const educations = [
  {
    title: "B.S. Information Systems Engineering",
    institution: "Universidad Tecnológica Nacional, Argentina",
    date: "2021 - 2025",
    description: "Graduated with academic honors (2nd highest GPA in cohort).",
  },
  {
    title: "Certified Tech Developer",
    institution: "Digital House, Argentina",
    date: "2021 - 2022",
    description: "Completed a two-year full stack development course.",
  },
];

const EducationContent = () => {
  return (
    <div className="flex flex-col gap-4">
      {educations.map((edu, index) => (
        <div key={index}>
          <h3 className="text-lg font-bold text-white">{edu.title}</h3>
          <div className="flex justify-between align-middle">
            <p className="text-sm italic">{edu.institution}</p>
            <p className="text-sm text-gray-400 mb-1">{edu.date}</p>
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
