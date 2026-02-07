import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DotsLoader = () => {
  const dotsRef = useRef([]);

  const dotCount = 4;
  const spacing = 0.22; // tighter spacing

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;

      // subtle Apple-like pulse
      const scale = 0.7 + Math.sin(time * 3 - i * 0.5) * 0.2;
      dot.scale.set(scale, scale, scale);
    });
  });

  return (
    <group scale={0.8}> {/* overall smaller */}
      {Array.from({ length: dotCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          position={[
            (i - (dotCount - 1) / 2) * spacing,
            0,
            0,
          ]}
        >
          <sphereGeometry args={[0.045, 32, 32]} /> {/* smaller dots */}
          <meshStandardMaterial
            color={new THREE.Color().lerpColors(
              new THREE.Color("#f5f5f7"),
              new THREE.Color("#9ca3af"),
              i / (dotCount - 1)
            )}
            metalness={0.35}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export default DotsLoader;