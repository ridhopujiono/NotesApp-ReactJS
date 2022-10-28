import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import AddEvent from '../components/AddEvent'
import PropTypes from 'prop-types'
import axios from 'axios'
import EndPoint from "../config/EndPoint";

const Detail = ({doArchive}) => {

  if(localStorage.getItem('_token_user_dicoding') == null){
    window.location.href = '/';
  }

  const bearer_token = `Bearer ${localStorage.getItem('_token_user_dicoding')}`;
  const {eventId} = useParams();
  const [data, setData] = useState([])
  const getData = () => {
    axios.get(EndPoint.base + `/notes/${eventId}`, {
      headers: {
          'Authorization': bearer_token
      }
    }).then((res) => {
        setData(res.data.data)
    });
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className='container'>
        <h2>{data.title}</h2>
        <small>{data.createdAt}</small>
        <br></br>
        <br></br>
        <p>
          {data.body}
        </p>
        <p>
          Status : 
          {(data.archived == true) ? 'ter-arsip' : 'tidak terarsip'}
        </p>
        {(data.archived == true) ? 
        <button className='btn-unarchived' onClick={() => doArchive(false, eventId)}>Batalkan Arsip</button> :  <button className='btn-unarchived' onClick={() => doArchive(true, eventId)}>Arsipkan</button>
        }
    </div>
  )
}
Detail.propTypes = {
  detailHandler: PropTypes.any,
  doArchive: PropTypes.any
}
export default Detail
