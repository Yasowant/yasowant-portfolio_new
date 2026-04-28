// src/components/ThreeAvatar.jsx
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

const ThreeAvatar = () => {
  return (
    <Canvas style={{ height: 300 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="#6366f1" wireframe />
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeAvatar;
