
const Event = ({id, title, body, created_at, archived, deleteEventHandler, doArchive}) => {
      return (
      
      <div className="event">
         <div>
            <small className="event-title">{title}</small>
            <br></br>
            <small className="event-date">{created_at}</small>
            <br></br>
            <span>{body}</span>
         </div>
         <div className="event-footer">
            <button onClick={() => doArchive(id)}  className="btn-arsip">Arsipkan</button>
            <button onClick={() => deleteEventHandler(id)} className="btn-delete">Hapus</button>
         </div>
      </div>
      );
}

export default Event;