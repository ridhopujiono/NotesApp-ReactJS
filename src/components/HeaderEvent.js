import useState from 'react';
import {FaPlus} from 'react-icons/fa';

const HeaderEvent = ({darkHandler}) => {
   let toggleFormContainer = false;
   const toggleForm = () =>{
      let form = document.querySelector('.add-event-container');
      let button = document.querySelector('.addEventButton');
      if(!toggleFormContainer){
         form.classList.add('d-flex');
         form.classList.remove('d-none');
         button.innerHTML = 'Tutup Catatan';
         button.style.background = 'red';
         toggleFormContainer = true
      }else{
         form.classList.add('d-none');
         form.classList.remove('d-flex');
         button.innerHTML = 'Buat Catatan';
         button.style.background = '#5ebb33';
         toggleFormContainer = false
      }
   }
   return (
      <div className="header">
         <div className="header-title">
            Catatan Saya
         </div>
         <div>
            <button className='addEventButton' onClick={toggleForm}>Buat Catatan
            </button>
            <button onClick={() => darkHandler((prevDark) => !prevDark)} className="toggle-mode">Mode</button>
         </div>
      </div>
   );
}
export default HeaderEvent;