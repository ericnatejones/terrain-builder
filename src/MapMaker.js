import React, {useState} from 'react'
import TileSheet from "./TileSheet"
import CanvasContainer from './canvas/CanvasContainer';


export default function MapMaker() {

    const [selected, setSelected] = useState({rowStart: 0, colStart: 0})
    const [selectedEnd, setSelectedEnd] = useState({ rowEnd: 0, colEnd: 0})
    const [isReadyToPlace, setIsReadyToPlace] = useState(false)
    const [areToolTipsOn, setAreToolTipsOn] = useState(true)

    const handleMouseDown = (i, j) => {
        setSelected({rowStart: i, colStart: j})
        setSelectedEnd({rowEnd: i, colEnd: j})
    }

    return (
        <div className="container">
            <CanvasContainer selected={{...selected, ...selectedEnd}} 
                        ready={isReadyToPlace}
                        setReady={setIsReadyToPlace}
                        toggleToolTips={setAreToolTipsOn}
                        areToolTipsOn={areToolTipsOn}/>
            <div className="map-container">
            <TileSheet  selected={{...selected, ...selectedEnd}} 
                        handleMouseDown={handleMouseDown}
                        handleStartChange={setSelected} 
                        handleEndChange={setSelectedEnd} 
                        setIsReadyToPlace={setIsReadyToPlace}
                        areToolTipsOn={areToolTipsOn}/>
            </div>
        </div>
    )
}
