// "use client"
import React, {PropsWithChildren} from "react";
import Skeleton, {SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export  const IconImageLoader = () => {
  return (
      <SkeletonTheme baseColor="skyBlue"  highlightColor="#ffff" >
      <p><Skeleton count={1} height={"5vh"} width={"100%"}  /></p>     
    </SkeletonTheme>
  );
}