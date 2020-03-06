import React, {createContext, useState} from 'react'
const SelectionContext = createContext()

function SelectionContextProvider(props) {
    const [selection, setSelection] = useState([])
    const [isDragging,setIsDragging] = useState(false)
    const [selectionClickPosition, setSelectionClickPosition] = useState({x:0,y:0})
    const [pageX, setPageX] = useState(0)
    const [pageY, setPageY] = useState(0)

    const holdSelection = (selection) => {
        setSelection(selection)
    }

    const setPageXY = (x, y) => {
        setPageX(x)
        setPageY(y)
    }

    return (
        <SelectionContext.Provider value={{selection, holdSelection, 
                                        setIsDragging, isDragging, 
                                        pageX, pageY, setPageXY,
                                        setSelectionClickPosition,
                                        selectionClickPosition}}>
            {props.children}
        </SelectionContext.Provider>
    )
}

export {SelectionContext, SelectionContextProvider}