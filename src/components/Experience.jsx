import {
  Center,
  Environment,
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
  SoftShadows,
  Text3D,
} from "@react-three/drei";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  GodRays,
} from "@react-three/postprocessing";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { themeAtom, THEMES } from "./UI";

export const Experience = () => {
  const [theme] = useAtom(themeAtom);

  const boundaries = {
    debug: false,
    x: 12,
    y: 8,
    z: 20,
  };

  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const scaleX = Math.max(0.5, size[0] / 1920);
  const scaleY = Math.max(0.5, size[1] / 1080);
  const responsiveBoundaries = {
    x: boundaries.x * scaleX,
    y: boundaries.y * scaleY,
    z: boundaries.z,
  };

  useEffect(() => {
    let timeout;
    function updateSize() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSize([window.innerWidth, window.innerHeight]);
      }, 50);
    }
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const [sunRef, setSunRef] = useState();

  const focusRange = 3.5;
  const focusDistance = 0.25;
  const focalLength = 0.22;
  const bokehScale = 5.5;

  return (
    <>
      <OrbitControls />

      <mesh visible={boundaries.debug}>
        <boxGeometry
          args={[
            responsiveBoundaries.x,
            responsiveBoundaries.y,
            responsiveBoundaries.z,
          ]}
        />
        <meshStandardMaterial
          color="orange"
          transparent
          opacity={0.5}
          side={DoubleSide}
        />
      </mesh>
      {/* GROUND */}
      <mesh
        position-y={-responsiveBoundaries.y / 2}
        rotation-x={-Math.PI / 2}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={THEMES[theme].groundColor} />
      </mesh>

      {/* LIGHTS */}
      <SoftShadows size={15} focus={1.5} samples={12} />
      <Environment preset="sunset"></Environment>
      <directionalLight
        position={[15, 15, 15]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-camera-far={300}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.1}
      />
      <hemisphereLight
        intensity={1.35}
        color={THEMES[theme].skyColor}
        groundColor={THEMES[theme].groundColor}
      />

      {/* SUN */}
      <mesh
        ref={(ref) => setSunRef(ref)}
        position-y={responsiveBoundaries.y / 4}
        position-z={-20}
        rotation-x={degToRad(70)}
      >
        <circleGeometry args={[6, 64]} />
        <meshBasicMaterial
          depthWrite={false}
          color="#FFE4B5"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* TEXT */}
      <group key={theme + scaleX}>
        <Float
          position-y={0.5 * scaleX}
          floatIntensity={2 * scaleX}
          rotationIntensity={2}
        >
          <Center>
            <Text3D
              castShadow
              bevelEnabled
              font="/fonts/Poppins Black_Regular.json"
              smooth={1}
              scale={0.008 * scaleX}
              size={80}
              height={4}
              curveSegments={10}
              bevelThickness={20}
              bevelSize={2}
              bevelOffset={0}
              bevelSegments={5}
            >
              {THEMES[theme].title}
              <MeshTransmissionMaterial
                color={THEMES[theme].titleColor}
                clearcoat={1}
                samples={3}
                thickness={10}
                ior={1.5}
                chromaticAberration={0.25}
                anisotropy={0.4}
              />
            </Text3D>
          </Center>
        </Float>
        <Float position-y={-0.5 * scaleX} speed={3} floatIntensity={1 * scaleX}>
          <Center>
            <Text3D
              castShadow
              bevelEnabled
              font="/fonts/Poppins Black_Regular.json"
              smooth={1}
              scale={0.008 * scaleX}
              size={80}
              height={4}
              curveSegments={10}
              bevelThickness={20}
              bevelSize={2}
              bevelOffset={0}
              bevelSegments={5}
            >
              {THEMES[theme].subtitle}
              <MeshTransmissionMaterial
                color={THEMES[theme].titleColor}
                clearcoat={1}
                samples={3}
                thickness={10}
                ior={1.5}
                chromaticAberration={0.25}
                anisotropy={0.4}
              />
            </Text3D>
          </Center>
        </Float>
      </group>

      {/* Post Processing */}
      <EffectComposer>
        {THEMES[theme].dof && (
          <DepthOfField
            target={[0, 0, 0]} // where to focus
            worldFocusRange={focusRange} // how far away to start blurring
            worldFocusDistance={focusDistance} // where to focus
            focalLength={focalLength} // focal length
            bokehScale={bokehScale} // bokeh size
          />
        )}
        {sunRef && <GodRays sun={sunRef} exposure={0.34} decay={0.89} blur />}
        <Bloom luminanceThreshold={1.5} intensity={0.6} mipmapBlur />
      </EffectComposer>
    </>
  );
};
