import Event from '../components/Event'
import SearchEvent from '../components/SearchEvent'; 
const Main = ({events, deleteEventHandler, searchEventHandler, doArchive}) => {
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

export default Main;