import {React, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Create from '../views/Create'
import Main from '../views/Main'
import HeaderEvent from '../components/HeaderEvent'

const Router = () => {
  const [dark, setDark] = useState(false);
  return (
    <div>
      {/* <HeaderEvent /> */}

      <Routes>
      <Route path="/" element={<HeaderEvent darkHandler={setDark} />}>
          <Route index element={<Main />} />
      </Route>
       
         <Route path="/add" element={<Create />} /> 
      </Routes>
    </div>
  )
}

export default Router
