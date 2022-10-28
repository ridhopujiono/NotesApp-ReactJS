import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {nanoid} from 'nanoid';
import AddEvent from "./components/AddEvent";
import HeaderEvent from "./components/HeaderEvent";
import {Routes, Route} from "react-router-dom";
import Create from './views/Create'
import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'
import Detail from './views/Detail'
import PageNotFound from './views/PageNotFound'
import { useNavigate } from "react-router-dom";
import EndPoint from "./config/EndPoint";
import axios from "axios";
import Container from './components/Container'
import ThemeContext, {themes} from "./config/ThemeContext";

const App = () => {

  const navigate = useNavigate();
  const [searchEvent, setSearchEvent] = useState('');
  const [dark, setDark] = useState(false);

  function formatMyDate(date){
    let newDate = new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return newDate;
  }

  const [events, setEvents] = useState([]);
  const getNotesApiURL = EndPoint.notes;
  const getNotesArchivedApiURL = EndPoint.notes_archived;
  const postNotesApiURL = EndPoint.post;
  const bearer_token = `Bearer ${localStorage.getItem('_token_user_dicoding')}`;


const getAPIResult = () => {
  if(bearer_token != 'Bearer null'){
    const requestArchived = axios.get(getNotesArchivedApiURL, {
      headers: {
                'Authorization': bearer_token
      }
    });
    const requestNonArchived = axios.get(getNotesApiURL, {
      headers: {
                'Authorization': bearer_token
      }
    });
    axios
   .all([requestArchived, requestNonArchived])
   .then(
     axios.spread((...responses) => {
       let result = null;
       const responseOne = responses[0].data.data;
       const responseTwo = responses[1].data.data;
       if(responseOne.length < 1){
          result = responseTwo;
       }else if(responseTwo.length < 1){
          result = responseOne
       }else{
          result = [...responseOne, ...responseTwo];
       }
       setEvents(result)
     })
   )
   .catch(errors => {
     // react on errors.
     console.error(errors);
   });
  }
  
}


 
const addEventHandler = (title, body) =>{
  let resultResponse = null;
  // const newDatas = [...events, newData];
  // setEvents(newDatas);
  
  // CREATE WITH API
  axios.post(postNotesApiURL, {
    title: title,
    body: body,
  },
  {
    headers: {
      'Authorization': bearer_token
    }
  }
  ).then((response) => {
      if(response.data.status == 'success'){
          window.location.href = '/notes'
      }else{
          alert('Something is wrong !');
      }
    }, (error) => {
      console.log(error)
        if(error.code == 'ERR_BAD_REQUEST'){
          alert("BAD REQUEST")
      }
  });

}
const deleteEventHandler = (id) =>{
  axios.delete(EndPoint.base + `/notes/${id}`, {
    headers: {
        'Authorization': bearer_token
    }
  })
  const newData = events.filter((event) => 
    event.id !== id
  );
  setEvents(newData);
}
const doArchive = (type, id) => {
  let getData = [...events];
  let getIndex = getData.findIndex(x => x.id === id);
  const bearer_token = `Bearer ${localStorage.getItem('_token_user_dicoding')}`;
  if(type == true){
    getData[getIndex].archived = true;
    axios.post(EndPoint.base+`/notes/${getData[getIndex].id}/archive`,
    {},
    {
      headers: {
          Authorization: bearer_token
      }
    })
      .then((response) => {
        if(response.data.status == 'success'){
            alert(response.data.message);
        }else{
            alert('Something is wrong !');
        }
      }, (error) => {
          console.log(error)
    }); 
  }else{
    getData[getIndex].archived = false; 
    axios.post(EndPoint.base+`/notes/${getData[getIndex].id}/unarchive`,
    {},
    {
      headers: {
          Authorization: bearer_token
      }
    })
      .then((response) => {
        if(response.data.status == 'success'){
            alert(response.data.message);
        }else{
            alert('Something is wrong !');
        }
      }, (error) => {
          console.log(error)
    }); 
  }
  setEvents(getData)
  navigate('/notes');
}
useEffect(()=>{
  getAPIResult()
}, []);

// 
  // THEME
  const theme_ = useContext(ThemeContext);
  const [theme, setTheme] = useState(theme_);

  const darkHandler = () => theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light)
// 


  return (
    
    // <div className={`${dark && 'dark'}`}>
    <ThemeContext.Provider value={theme} >
      {/* <Container /> */}
      <div style={theme}>
        <div className="container">
        {
          (window.location.pathname =='/' || window.location.pathname  == '/register') ? null : <HeaderEvent darkHandler={darkHandler}/>
        }
        
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/notes" element={<Main events={(events.length > 0) ? events.filter((event) => event.title.toLowerCase().includes(searchEvent)) : []} deleteEventHandler={deleteEventHandler} searchEventHandler={setSearchEvent} doArchive={doArchive}/>}>
            </Route>
            
            <Route path="/add" element={<Create addEventHandler={addEventHandler} />} /> 
            <Route path="/notes/detail/:eventId" element={<Detail doArchive={doArchive}/>} /> 
            <Route path="*" element={<PageNotFound />} /> 
          </Routes>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
