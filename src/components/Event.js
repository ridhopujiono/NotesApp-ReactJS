import { NavLink } from "react-router-dom";

const Event = ({id, title, body, createdAt, archived, deleteEventHandler, doArchive}) => {
      return (
      
      <div className="event">
         <div>
            <small className="event-title">{title}</small>
            <br></br>
            <small className="event-date">{createdAt}</small>
            <br></br>
            <span>{body}</span>
         </div>
         <div className="event-footer">
            <NavLink className="btn-detail" to={`${'detail'}/${id}`}>Detail</NavLink>
            {(archived == false) ? 
            <button onClick={() => doArchive(true,id)}  className="btn-arsip">Arsipkan</button> : <button onClick={() => doArchive(false,id)}  className="btn-arsip">Batal Arsip</button>
            }
            <button onClick={() => deleteEventHandler(id)} className="btn-delete">Hapus</button>
         </div>
      </div>
      );
}

export default Event;