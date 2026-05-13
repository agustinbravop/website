import { Canvas as R3FCanvas } from "@react-three/fiber";
import SquareFadeMesh from "./FluidMesh";

const Scene = () => {
  return (
    <R3FCanvas
      style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      camera={{ position: [0, 0, 150], fov: 75 }}
    >
      <ambientLight intensity={1} color="#ffffff" />
      <SquareFadeMesh />
    </R3FCanvas>
  );
};

export default Scene;
