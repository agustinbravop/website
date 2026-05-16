import React from "react";
import StackIcon from "tech-stack-icons";

const skillIcons: Record<string, React.ReactNode> = {
  React: <StackIcon name="react" />,
  TypeScript: <StackIcon name="typescript" />,
  Tailwind: <StackIcon name="tailwindcss" />,
  Python: <StackIcon name="python" />,
  Go: <StackIcon name="go" />,
  PostgreSQL: <StackIcon name="postgresql" />,
  Docker: <StackIcon name="docker" />,
  Kubernetes: <StackIcon name="kubernetes" />,
  Linux: <StackIcon name="linux" />,
  AWS: <StackIcon name="aws" variant="dark" />,
};

const SkillsContent = () => {
  return (
    <div>
      <h3 className="text-md text-white">
        A full-stack engineer AND a devops tryhard.
      </h3>
      <div className="grid grid-cols-5 gap-y-4 mt-4">
        {Object.entries(skillIcons).map(([skill, icon]) => (
          <div key={skill} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10">{icon}</div>
            <span className="text-gray-200 text-sm">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsContent;
