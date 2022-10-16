import { useState } from "react";
import PropTypes from 'prop-types';
const AddEvent = ({addEventHandler}) => {
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [limitTitle, setlimitTitle] = useState(200);

   const titleChange = (e) => {
      if(limitTitle - e.target.value.length >= 0){
         setTitle(e.target.value);
      }
   }
   const bodyChange = (e) => {
       setBody(e.target.value);
   }
   const handeSaveClick = () => {
      if(title.trim().length > 0 && body.trim().length > 0){
         addEventHandler(title, body)
         setTitle('');
         setBody('');
      }
   }

   return (
      <div className="add-event-container">
         <div className="add-event-item">
            <small className="event-helper">Karakter tersisa : {limitTitle - title.length}</small>
            <div className="group-form">
               <input type="text" placeholder="Judul" onChange={titleChange} value={title} />
            </div>
            <div className="group-form">
               <textarea rows="8" placeholder="Keterangan" onChange={bodyChange} value={body}></textarea>
            </div>
            <div className="group-form">
               <button className="btn-save" onClick={handeSaveClick}>Save</button>
            </div>
         </div>
      </div>
   );
}
export default AddEvent;