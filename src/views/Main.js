import Event from '../components/Event'
import SearchEvent from '../components/SearchEvent'; 
import PropTypes from 'prop-types'
import axios from "axios";
import { useEffect } from 'react';


const Main = ({events, deleteEventHandler, searchEventHandler, doArchive}) => {
   const storeUserDetail  = () => {
      const userURL = 'https://notes-api.dicoding.dev/v1/users/me';
      const bearer_token = `Bearer ${localStorage.getItem('_token_user_dicoding')}`;
      axios.get(userURL, {
          headers: {
              'Authorization': bearer_token
          }
      })
      .then((res) => {
          if(res.data.status == 'success'){
              localStorage.setItem('_detail_user_dicoding', 
                  JSON.stringify(res.data.data)
              );
          }else{
              alert('Something is wrong.');
          }
      })
      .catch((error) => {
          console.error(error)
      })
   }
   useEffect(() => {
      storeUserDetail()
   }, []);
   return (
      <div className="">
         <SearchEvent searchEventHandler={searchEventHandler}/>
         <h3>Catatan Aktif</h3>
         <div className='list-event'>
         {
            (events.length != 0) ? 
             (events.map((event, index) =>
               (event.archived === false) ? (
                  <Event id={event.id} title={event.title} body={event.body} createdAt={event.createdAt} archived={event.archived} deleteEventHandler={deleteEventHandler} doArchive={doArchive}/>
               ) : ''  
             ))
            :
            <div className='alert-warning'>Tidak ada catatan</div>
            
         }
         </div>
         <h3>Catatan Arsip</h3>
         <div className='list-event'>
         {
            (events.length != 0) ? 
             (events.map((event, index) =>
               (event.archived === true) ? (
                  <Event id={event.id} title={event.title} body={event.body} createdAt={event.createdAt} archived={event.archived} deleteEventHandler={deleteEventHandler} doArchive={doArchive}/>
               ) : ''  
             ))
            :
            <div className='alert-warning'>Tidak ada catatan</div>
            
         }
         </div>
      </div>
   )
}
Main.propTypes  = {
   events: PropTypes.any,
   deleteEventHandler: PropTypes.any,
   searchEventHandler: PropTypes.any,
   doArchive: PropTypes.any,
}
export default Main;