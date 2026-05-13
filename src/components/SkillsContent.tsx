import React from "react";
import StackIcon from "tech-stack-icons";

const skillIcons: Record<string, React.ReactNode> = {
  React: <StackIcon name="react" />,
  TypeScript: <StackIcon name="typescript" />,
  Go: <StackIcon name="go" />,
  Python: <StackIcon name="python" />,
  Docker: <StackIcon name="docker" />,
  Kubernetes: <StackIcon name="kubernetes" />,
  Linux: <StackIcon name="linux" />,
  AWS: <StackIcon name="aws" variant="dark" />,
};

const SkillsContent = () => {
  return (
    <div>
      <h3 className="text-sm text-white">
        I'm both a full stack engineer and a devops tryhard.
      </h3>
      <div className="grid grid-cols-4 mt-3">
        {Object.entries(skillIcons).map(([skill, icon]) => (
          <div key={skill} className="flex flex-col items-center gap-2 py-2">
            <div className="w-10 h-10">{icon}</div>
            <span className="text-gray-200 text-xs">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsContent;
