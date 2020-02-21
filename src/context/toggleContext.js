import React, {useState} from 'react'
const ToggleContext = React.createContext()

function ToggleContextProvider(props) {
    // default to true in development
    const [tooltipOn, setTooltipOn] = useState(false)
    
    const toggleTooltip = () => {
        setTooltipOn(prevBool => !prevBool)
    }
    
    return (
        <ToggleContext.Provider value={{tooltipOn, toggleTooltip}}>
            {props.children}
        </ToggleContext.Provider>
    )
    
}

export {ToggleContextProvider, ToggleContext}
