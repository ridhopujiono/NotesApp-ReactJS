import React from 'react'
import AddEvent from '../components/AddEvent'
const Create = ({addEventHandler}) => {
  return (
    <div>
      <AddEvent addEventHandler={addEventHandler} />
    </div>
  )
}

export default Create
