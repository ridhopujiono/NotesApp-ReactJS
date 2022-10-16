import React from 'react';
import {MdSearch} from 'react-icons/md';
import PropTypes from 'prop-types'
const SearchEvent = ({searchEventHandler}) => {
   return (
      <div className='search-container'>
         <MdSearch className='search-icons' size='1.3em' />
            <input onChange={(e) => searchEventHandler(e.target.value)} type="text" className='input-search' placeholder='Cari disini'/>
       </div>
   );
}
SearchEvent.propTypes = {
   searchEventHandler: PropTypes.any
}
export default SearchEvent;