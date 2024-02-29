import React, {useRef} from "react";
import * as THREE from 'three';
import {
          useFrame,
          useLoader,
      } from '@react-three/fiber';

import { 
    TextureLoader 
}  from 'three';

interface IProps{    //props {position: Array(3)}
  position: number[];
}

export const SphereMesh  =  (props: any) => {
    const refs = useRef<any>();
    const im = "/images/TUI_Logo.png"

    const texture = useLoader(TextureLoader, im)
    useFrame(() => {
   
      return refs.current.rotation.y += 0.001;  
        
    });


  
    return (
      <mesh
        ref={refs}
        {...props}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[30,40, 20]} />
        <meshPhysicalMaterial
            map={texture} 
            fog={false}
            transparent
            transmission={0.5}
            reflectivity={6}            
            side={THREE.DoubleSide}
        />                      
      </mesh>
    );
};




