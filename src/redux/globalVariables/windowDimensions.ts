import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

type ScreenI = {
    width:undefined | null;
    height:undefined | null
}

type BreakPoints = {
  sm:number;
  md:number;
  lg:number;
  xl:number;
  is2xl:number;
}

interface windowDimensionsState {
  loading: boolean;
  screenDimensions:ScreenI;
  breakPoints: BreakPoints;
};

const initialState = {
  loading: false,
  screenDimensions: {
    width: typeof window === 'object' ? window.innerWidth : undefined,
    height:typeof window === 'object' ? window.innerHeight : undefined,
  },
  breakPoints: {
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
    is2xl: 0
  },

} as windowDimensionsState;


const windowDimensionsSlice = createSlice({
    name: "windowDimensionsactions",
    initialState,
    reducers: {
      windowDimensionsActions:(state)=> {  
        try {
              let isState = {
                loading: state.loading = true,
                screenDimensions: {
                  width: state.screenDimensions.width ,
                  height: state.screenDimensions.height
                },
                breakPoints: {
                  sm:state.breakPoints.sm = 640,
                  md:state.breakPoints.md = 768,
                  lg:state.breakPoints.lg = 1024,
                  xl:state.breakPoints.xl = 1280,
                  is2xl:state.breakPoints.is2xl = 1536
                }
              };
            state = isState;
          } catch (error) {
            console.log(error)
          }      
      },
},
    
 
});
  

export const { 
    windowDimensionsActions
}  = windowDimensionsSlice.actions;
  
export default windowDimensionsSlice.reducer;


  


  