import React, {useState, useContext, useEffect, useCallback} from 'react'
import Tooltip from '../components/Tooltip';
import {SelectionContext} from '../context/selectionContext'

const orientSelection = (colStart, colEnd, rowStart, rowEnd) => {
    return {
        colStart: Math.min(colStart, colEnd),
        rowStart: Math.min(rowStart, rowEnd),
        colEnd: Math.max(colStart, colEnd),
        rowEnd: Math.max(rowStart, rowEnd)
    }
}

export default function TileSheet({handleEndChange, handleMouseDown, handleStartChange, selected, tutorialNumber, setTutorialNumber}) {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [shouldSaveMap, setShouldSaveMap] = useState(false)

    const {holdSelection, setDraggingStage, setSelectionClickPosition, setPageXY} = useContext(SelectionContext)

    const {colStart, colEnd, rowStart, rowEnd} = selected
    

    const handleMouseDownLocal = useCallback((e, j, i, isInSelection, {x, y}) => {
        e.persist()
       
        if(isInSelection){
            setDraggingStage("dragging")
            setSelectionClickPosition({x, y})
            setPageXY(e.pageX, e.pageY)
        } else {
            setIsMouseDown(true)
            handleMouseDown(j, i)
        }
    }, [handleMouseDown, setDraggingStage, setSelectionClickPosition, setPageXY])

    const handleMouseEnter = useCallback((j, i, isInSelection) => {
        if (isMouseDown && !isInSelection) {
            handleEndChange({rowEnd: j, colEnd: i})
        }
        if(tutorialNumber === 0){
            const response = prompt(`Welcome to React Terrain Builder! 
            
Either click a tile on the image or,  
drag your mouse over part of the image to select a range of tiles. 

At any time during the tutorial, you can enter "skip" in the prompt`)
    
            if(response.toLowerCase() === "skip"){
                setTutorialNumber(10)
            }
            setTutorialNumber(1)
            localStorage.tutorialNumber = 1
        }
    }, [tutorialNumber, setTutorialNumber, handleEndChange, isMouseDown])

    const handleMouseUpOrLeave = useCallback(() => {
        if(tutorialNumber === 1 && isMouseDown){
            const response = prompt(`You can now drag the selection to the blank grid to place it
            
            (type "skip" to skip this tutorial)`)

            if(response?.toLowerCase() === "skip"){
                setTutorialNumber(10)
            }

            setTutorialNumber(2)
            localStorage.tutorialNumber = 2
        }
        
        const oriented = orientSelection(
            colStart, 
            colEnd, 
            rowStart, 
            rowEnd
        )

        handleEndChange({rowEnd: oriented.rowEnd, colEnd: oriented.colEnd})
        handleStartChange({rowStart: oriented.rowStart, colStart: oriented.colStart})
        setIsMouseDown(false)
        setShouldSaveMap(true)
    }, [isMouseDown, handleStartChange, handleEndChange, rowStart, rowEnd, colEnd, colStart, tutorialNumber, setTutorialNumber])

    
    
    const oriented = orientSelection(
        colStart, 
        colEnd, 
        rowStart, 
        rowEnd
    )

    const getTiles = useCallback(() => {
        const tileMap = []
        const tiles = []

        for(let i = 0; i < 32; i++){
            for(let j = 0; j < 32; j++){
                const style = {
                    backgroundPosition: `-${j * 32}px -${i * 32}px`,
                }
                
                let isInSelection = false

                if(j <= oriented.rowEnd && j >= oriented.rowStart && i <= oriented.colEnd && i >= oriented.colStart){
                    style.border = "solid black 1px"
                    style.backgroundColor = "antiquewhite"
                    isInSelection = true
                }

                const positionOnSelection = {y: i - oriented.colStart, x: j - oriented.rowStart}

                
                if(isInSelection){
                    const tile = { 
                            key:"i" + i + "j" + j,
                            style,
                            className:"tile" ,
                            onMouseDown:(e)=>handleMouseDownLocal(e, j, i, isInSelection, positionOnSelection),
                            onMouseUp:handleMouseUpOrLeave,
                            onMouseEnter:()=>handleMouseEnter(j, i, isInSelection)
                    }
                    tiles.push(tile)
                }
                const tile =  <div 
                    key={"i" + i + "j" + j}
                    style={style} 
                    className="tile" 
                    onMouseDown={(e)=>handleMouseDownLocal(e, j, i, isInSelection, positionOnSelection)}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseEnter={()=>handleMouseEnter(j, i, isInSelection)}
                ></div> 
                tileMap.push(tile)
            }
        }
        return {tiles, tileMap}
    }, [oriented.rowStart, oriented.rowEnd, oriented.colStart, oriented.colEnd, handleMouseDownLocal, handleMouseEnter, handleMouseUpOrLeave])

    if(shouldSaveMap){
        setShouldSaveMap(false)
    }

    useEffect(()=>{
        holdSelection({tiles: getTiles().tiles, colStart: oriented.colStart, rowStart: oriented.rowStart, colEnd: oriented.colEnd, rowEnd: oriented.rowEnd})
    }, [shouldSaveMap, holdSelection, oriented.colStart, oriented.rowStart, oriented.colEnd, oriented.rowEnd, getTiles])
    
    return (
        <Tooltip tip="click a tile, or click and drag to make a larger selection. Then drag the selection to the canvas or click in the canvas to place terrain">
            <div onMouseLeave={handleMouseUpOrLeave} className="tileSheet" >
                {getTiles().tileMap}
            </div>
        </Tooltip>
    )
}

