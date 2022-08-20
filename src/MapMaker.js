import React, {useState, useContext, useCallback} from 'react'
import {SelectionContext} from "./context/selectionContext"
import TileSheet from "./tileSheet/TileSheet"
import CanvasContainer from './canvas/CanvasContainer';


export default function MapMaker() {

    const [selected, setSelected] = useState({rowStart: 0, colStart: 0})
    const [selectedEnd, setSelectedEnd] = useState({ rowEnd: 0, colEnd: 0})
    const [areToolTipsOn, setAreToolTipsOn] = useState(true)
    const [tutorialNumber, setTutorialNumber] = useState(Number(localStorage.tutorialNumber) || 0)

    const {setDraggingStage, draggingStage, setSelectionClickPosition} = useContext(SelectionContext)

    const handleMouseDown = useCallback((i, j) => {
        setSelected({rowStart: i, colStart: j})
        setSelectedEnd({rowEnd: i, colEnd: j})
    }, [])

    const handleMouseLeave = useCallback(() => {
        if(draggingStage !== "dragging"){
            setDraggingStage("pre")
            setSelectionClickPosition({x:0,y:0})
        }
    }, [draggingStage, setDraggingStage, setSelectionClickPosition])

    return (
        <div className="container">
            <CanvasContainer selected={{...selected, ...selectedEnd}} 
                        toggleToolTips={setAreToolTipsOn}
                        areToolTipsOn={areToolTipsOn}
                        tutorialNumber={tutorialNumber}
                        setTutorialNumber={setTutorialNumber}/>
            <div className="map-container" onMouseLeave={handleMouseLeave}>
                <TileSheet selected={{...selected, ...selectedEnd}} 
                        handleMouseDown={handleMouseDown}
                        handleStartChange={setSelected} 
                        handleEndChange={setSelectedEnd} 
                        areToolTipsOn={areToolTipsOn}
                        tutorialNumber={tutorialNumber}
                        setTutorialNumber={setTutorialNumber}/>
            </div>
        </div>
    )
}
