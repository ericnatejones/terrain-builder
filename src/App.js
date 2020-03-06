import React, {useContext} from 'react';
import MapMaker from './MapMaker'
import Selection from './components/Selection'
import { SelectionContext } from './context/selectionContext'
import './App.css';

function App() {
  const {isDragging, setIsDragging, setPageXY} = useContext(SelectionContext)

  const handleMouseUp = () => {
      setIsDragging(false)
  }

  const handleMouseMove = (e) => {
      e.persist()
      if(isDragging || e.type === "click"){
        setPageXY(e.pageX, e.pageY)
      }
  }

  return (
    <div onClick={handleMouseMove} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <MapMaker/>
      {isDragging && <Selection/>}
    </div>
  );
}

export default App;
