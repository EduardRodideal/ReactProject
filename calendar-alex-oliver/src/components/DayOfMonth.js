import React from 'react'


function Day(props) {
    return (
        <li>
            <a 
                href="#" 
                title={props.title} 
                dataValue={props.dataValue}
                className={props.className} 
                onClick={() => props.onClick(props.dataValue)}                                            
            > {props.value}</a>
        </li>
    )
}


export default Day