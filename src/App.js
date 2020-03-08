import React, {useContext} from 'react';
import MapMaker from './MapMaker'
import Selection from './components/Selection'
import {SelectionContext} from './context/selectionContext'

import './App.css';

function App() {
  const {draggingStage, setPageXY} = useContext(SelectionContext)

  const handleDrag = (e) => {
      e.persist()
      if(draggingStage === "dragging" || e.type === "click"){
        setPageXY(e.pageX, e.pageY)
      }
  }

  return (
    <div onClick={handleDrag} onMouseMove={handleDrag}>
      <MapMaker/>
      {draggingStage === "dragging" && <Selection/>}
    </div>
  );
}

export default App;
