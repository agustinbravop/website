import React from "react";
import StackIcon from "tech-stack-icons";

const skillIcons: Record<string, React.ReactNode> = {
  React: <StackIcon name="react" />,
  TypeScript: <StackIcon name="typescript" />,
  Go: <StackIcon name="go" />,
  Python: <StackIcon name="python" />,
  Git: <StackIcon name="git" />,
  PostgreSQL: <StackIcon name="postgresql" />,
  Linux: <StackIcon name="linux" />,
  Docker: <StackIcon name="docker" />,
  Kubernetes: <StackIcon name="kubernetes" />,
  AWS: <StackIcon name="aws" variant="dark" />,
};

const SkillsContent = () => {
  return (
    <div>
      <h3 className="text-md text-white">
        I'm both a full stack engineer and a devops tryhard.
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
