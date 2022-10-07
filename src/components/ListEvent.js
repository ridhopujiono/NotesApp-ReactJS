import Event from './Event'; 
import SearchEvent from './SearchEvent'; 
const ListEvent = ({events, deleteEventHandler, searchEventHandler, doArchive}) => {
   return (
      <div className="">
         <SearchEvent searchEventHandler={searchEventHandler}/>
         <h3>Catatan Aktif</h3>
         <div className='list-event'>
         {
            (events.length != 0) ? 
             (events.map((event, index) =>
               (event.archived === false) ? (
                  <Event id={event.id} title={event.title} body={event.body} created_at={event.created_at} archived={event.archived} deleteEventHandler={deleteEventHandler} doArchive={doArchive}/>
               ) : ''  
             ))
            :
            <div className='alert-warning'>data catatan kosong</div>
            
         }
         </div>
         <h3>Catatan Arsip</h3>
         <div className='list-event'>
         {
            (events.length != 0) ? 
             (events.map((event, index) =>
               (event.archived === true) ? (
                  <Event id={event.id} title={event.title} body={event.body} created_at={event.created_at} archived={event.archived} deleteEventHandler={deleteEventHandler} doArchive={doArchive}/>
               ) : ''  
             ))
            :
            <div className='alert-warning'>data catatan kosong</div>
            
         }
         </div>
      </div>
   )
}

export default ListEvent;