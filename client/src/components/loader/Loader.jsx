import React from 'react'
import "./loader.css"

export const Loader = ({color = "rgb(0, 160, 223)"}) => {

    const style = {backgroundColor: color};

    return (
        <div className="loader">
            {[1, 2, 3].map((i) => (
                <div style={style} key={i}></div>
            ))}
        </div>
    )
}
