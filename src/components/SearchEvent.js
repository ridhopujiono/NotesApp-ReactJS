import React from 'react';
import {MdSearch} from 'react-icons/md';
const SearchEvent = ({searchEventHandler}) => {
   return (
      <div className='search-container'>
         <MdSearch className='search-icons' size='1.3em' />
            <input onChange={(e) => searchEventHandler(e.target.value)} type="text" className='input-search' placeholder='Cari disini'/>
       </div>
   );
}
export default SearchEvent;