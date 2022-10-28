import React from 'react'
import AddEvent from '../components/AddEvent'
import PropTypes from 'prop-types'

const Create = ({addEventHandler}) => {
  if(localStorage.getItem('_token_user_dicoding') == null){
    window.location.href = '/';
  }
  return (
    <div>
      <AddEvent addEventHandler={addEventHandler} />
    </div>
  )
}
Create.propTypes = {
  addEventHandler: PropTypes.any
}
export default Create
