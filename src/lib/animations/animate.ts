export const variants:any = {
    // enter: (direction) => {
     enter: (slideDirection:any) => {
      return {
        x: slideDirection > 0 ? 1000 : -1000,
        opacity: 0,
        height: "10%",
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,

      position:"relative",
      height:"80%",
      width:"100%"
    },
    exit: (slideDirection:any) => {
      return {
        zIndex: 0,
        x: slideDirection < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };