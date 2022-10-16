import React from 'react'
import { useParams } from 'react-router-dom'
import AddEvent from '../components/AddEvent'
const Detail = ({detailHandler, doArchive}) => {
  const {eventId} = useParams();
  const data = detailHandler(eventId);
  return (
    <div className='container'>
        <h2>{data[0].title}</h2>
        <small>{data[0].createdAt}</small>
        <br></br>
        <br></br>
        <p>
          {data[0].body}
        </p>
        <p>
          Status : 
          {(data[0].archived == true) ? 'ter-arsip' : 'tidak terarsip'}
        </p>
        {(data[0].archived == true) ? 
        <button className='btn-unarchived' onClick={() => doArchive(false, eventId)}>Batalkan Arsip</button> :  <button className='btn-unarchived' onClick={() => doArchive(true, eventId)}>Arsipkan</button>
        }
    </div>
  )
}

export default Detail
