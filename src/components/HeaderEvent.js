import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const HeaderEvent = ({darkHandler}) => {
   let navigate = useNavigate();
   const logoutHandler = () => {
      localStorage.removeItem("_token_user_dicoding");
      localStorage.removeItem("_detail_user_dicoding");
      navigate('/');
   }


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
            <NavLink to='/add' className="addEventButton">Tambah  Catatan</NavLink>
            <button onClick={() => darkHandler((prevDark) => !prevDark)} className="toggle-mode">Mode</button>
            <button onClick={() => logoutHandler()} className="logout">Logout</button>
         </div>
      </div>
   );
}

HeaderEvent.propTypes = {
   darkHandler: PropTypes.any
}
export default HeaderEvent;