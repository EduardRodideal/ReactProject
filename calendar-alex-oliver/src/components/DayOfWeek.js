import React from 'react'


function DayOfWeek(props) {
    return (
        <li>
            <a 
                href="#" 
                title={props.title} 
                dataValue={props.dataValue}
                className={props.className}                                                            
            > {props.value}</a>
        </li>
    )
}


export default DayOfWeek