import React from 'react'

function Month(props) {
    return (
        <li>
            <a 
                href="#" 
                title={props.title} 
                dataValue={props.value}
                className={props.className}
                onClick={() => props.onClick(props.dataValue)}
            > {props.month} </a>                           
            
        </li>
    )
}


export default Month