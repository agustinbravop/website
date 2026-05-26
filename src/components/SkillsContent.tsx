import icons from "./skillIcons";

const skills = [
  { label: "React", icon: icons.react },
  { label: "TypeScript", icon: icons.typescript },
  { label: "Python", icon: icons.python },
  { label: "Go", icon: icons.go },
  { label: "PostgreSQL", icon: icons.postgresql },
  { label: "Tailwind", icon: icons.tailwindcss },
  { label: "Linux", icon: icons.linux },
  { label: "Docker", icon: icons.docker },
  { label: "Kubernetes", icon: icons.kubernetes },
  { label: "AWS", icon: icons.aws },
];

const SkillsContent = () => {
  return (
    <div>
      <h2 className="text-md text-white">
        A full-stack engineer AND a devops tryhard.
      </h2>
      <div className="grid grid-cols-5 gap-y-4 mt-4">
        {skills.map(({ label, icon }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="w-10 h-10"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
            <span className="text-gray-200 text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsContent;
