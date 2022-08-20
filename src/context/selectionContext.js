import React, {createContext, useState, useCallback} from 'react'
const SelectionContext = createContext()

function SelectionContextProvider(props) {
    const [selection, setSelection] = useState({tiles:[]})
    const [draggingStage, setDraggingStage] = useState("pre")
    const [selectionClickPosition, setSelectionClickPosition] = useState({x:0,y:0})
    const [pageX, setPageX] = useState(0)
    const [pageY, setPageY] = useState(0)

    const holdSelection = useCallback((selection) => {
        setSelection(selection)
    }, [])

    const setPageXY = useCallback((x, y) => {
        setPageX(x)
        setPageY(y)
    }, [])

    return (
        <SelectionContext.Provider value={{selection, holdSelection, 
                                        setDraggingStage, draggingStage, 
                                        pageX, pageY, setPageXY,
                                        setSelectionClickPosition,
                                        selectionClickPosition}}>
            {props.children}
        </SelectionContext.Provider>
    )
}

export {SelectionContext, SelectionContextProvider}