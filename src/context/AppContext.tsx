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
  isModalOpen: boolean;
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
      const highestZIndex = Math.max(...state.nodes.map((node) => node.zIndex));
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.id
            ? { ...node, zIndex: highestZIndex + 1 }
            : node,
        ),
      };
    }
    default:
      return state;
  }
};

const initialState: AppState = {
  nodes: [
    {
      id: "about",
      position: { x: -745, y: 70 },
      data: {
        label: "About Me",
        content: <AboutMeContent />,
        width: 550,
      },
      zIndex: 1,
    },
    {
      id: "skills",
      position: { x: -165, y: 70 },
      data: {
        label: "Skills",
        content: <SkillsContent />,
        width: 400,
      },
      zIndex: 1,
    },
    {
      id: "experience",
      position: { x: 265, y: 70 },
      data: {
        label: "Experience",
        content: <ExperienceContent />,
        width: 475,
      },
      zIndex: 1,
    },
    {
      id: "education",
      position: { x: -740, y: 355 },
      data: {
        label: "Education",
        content: <EducationContent />,
        width: 450,
      },
      zIndex: 1,
    },
    {
      id: "buttons",
      position: { x: 465, y: 680 },
      data: {
        label: "",
        content: <ButtonsContent />,
        width: 275,
      },
      zIndex: 2,
    },
  ],
  isModalOpen: false,
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
