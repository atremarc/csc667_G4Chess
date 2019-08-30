import React from "react";
import loadable from '@loadable/component'
const OurChessBoard =  loadable(() => import('chessboardjsx'), { 
      fallback: <h2>Loading...</h2>,
      ssr: false 
})


function ChessboardNoSSR(props){
  
      return (
       <div>
        <OurChessBoard {...props}  />
        </div>
    
      )
    
}



export default ChessboardNoSSR;
