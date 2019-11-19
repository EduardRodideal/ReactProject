import React from 'react'

function Conditional(props) {
   const sentenceToDisplay = props.isLoading ? "Loading...." : "Some good stuff aboud conditional rendering"
   
   return (
       <h1>{sentenceToDisplay}</h1>
   )
   
}

export default Conditional