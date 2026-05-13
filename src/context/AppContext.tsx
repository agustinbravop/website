/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useState,
} from "react";
import AboutMeContent from "../components/AboutMeContent";
import SkillsContent from "../components/SkillsContent";
import ExperienceContent from "../components/ExperienceContent";
import EducationContent from "../components/EducationContent";
import ButtonsContent from "../components/ButtonsContent";

interface NodeData {
  label: string;
  content: React.ReactNode;
  width?: number;
}

export interface NodeState {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  data: NodeData;
}

interface AppState {
  nodes: NodeState[];
  highestZIndex: number;
}

type Action =
  | {
      type: "UPDATE_NODE_POSITION";
      payload: { id: string; position: { x: number; y: number } };
    }
  | { type: "BRING_TO_FRONT"; payload: { id: string } };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "UPDATE_NODE_POSITION":
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.id
            ? { ...node, position: action.payload.position }
            : node,
        ),
      };
    case "BRING_TO_FRONT": {
      const newHighestZIndex = state.highestZIndex + 1;
      return {
        ...state,
        highestZIndex: newHighestZIndex,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.id
            ? { ...node, zIndex: newHighestZIndex }
            : node,
        ),
      };
    }
    default:
      return state;
  }
};

const aboutMeNode = {
  id: "about",
  position: { x: 30, y: 70 },
  data: {
    label: "About Me",
    content: <AboutMeContent />,
    width: 550,
  },
};

const educationNode = {
  id: "education",
  position: { x: 30, y: 380 },
  data: {
    label: "Education",
    width: 450,
    content: <EducationContent />,
  },
};

const skillsNode = {
  id: "skills",
  position: { x: 610, y: 70 },
  data: {
    label: "Skills",
    width: 400,
    content: <SkillsContent />,
  },
};

const experienceNode = {
  id: "experience",
  position: { x: 1040, y: 70 },
  data: {
    label: "Experience",
    width: 475,
    content: <ExperienceContent />,
  },
};

const buttonsNode = {
  id: "buttons",
  position: { x: 1240, y: 690 },
  data: {
    label: "",
    width: 275,
    content: <ButtonsContent />,
  },
};

const initialNodes: NodeState[] = [
  skillsNode,
  buttonsNode,
  educationNode,
  experienceNode,
  aboutMeNode,
].map((node, index) => ({
  id: node.id,
  position: node.position,
  zIndex: index + 1,
  data: node.data,
}));

const initialState: AppState = {
  nodes: initialNodes,
  highestZIndex: initialNodes.length,
};

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
  isPortfolioModalOpen: boolean;
  setIsPortfolioModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{ state, dispatch, isPortfolioModalOpen, setIsPortfolioModalOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
