import React, {useRef, useEffect, useCallback, useMemo,Suspense, useState} from "react";
import {
  Canvas,
  extend,
  useThree
} from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera, Stars, useTexture, Text,Line } from '@react-three/drei';
import {SphereMesh} from "./SphereMesh";

  extend({OrbitControls})

const Orbit = () => {
  const {camera, gl} = useThree();
  //  camera.rotation.set(deg2rad(-30), 0, 0);
    return (
        <OrbitControls args={[camera, gl.domElement]}/>
    ) 
}
   

export const HeaderBacKGround =() => {
  return (

    <div   style={{ position:"absolute", top:0,margin:0, height:"8vh", width: "100vw", }}>
        <Canvas  
          camera={{position: [7,7,7]}} 
        >    
          <fog attach="fog" args={['white', 1, 10]}/> 
            <ambientLight intensity={5.2} />
              <Suspense fallback={null} >
                <SphereMesh position={[-9, 3, 22]}/>
              </Suspense>  
        </Canvas>             
      </div>
  );
}


