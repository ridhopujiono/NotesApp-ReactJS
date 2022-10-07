import ListEvent from "./components/ListEvent";
import { useState } from "react";
import { useEffect } from "react";
import {nanoid} from 'nanoid';
import AddEvent from "./components/AddEvent";
import HeaderEvent from "./components/HeaderEvent";

const App = () => {
  const [searchEvent, setSearchEvent] = useState('');
  const [dark, setDark] = useState(false);

  function formatMyDate(date){
    let newDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return newDate;
  }

 const [events, setEvents] = useState([]);

const addEventHandler = (title, body) =>{
  const date = new Date();
  const newData = {
    id: nanoid() + new Date().getTime(),
    title: title,
    body: body,
    created_at: date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    archived: false
  };
  const newDatas = [...events, newData];
  setEvents(newDatas);
}
const deleteEventHandler = (id) =>{
  const newData = events.filter((event) => 
    event.id !== id
  );
  setEvents(newData);
}
const doArchive = (id) => {
  let getData = [...events];
  let getIndex = getData.findIndex(x => x.id === id);
  getData[getIndex].archived = true; 
  setEvents(getData)
}
useEffect(() => {
    const savedEventsFromLocal = JSON.parse(
        localStorage.getItem('react-events-data')
    );
    if(savedEventsFromLocal){
      if(savedEventsFromLocal.length != 0){
        setEvents(savedEventsFromLocal)
      }
    }
}, []);
useEffect(()=>{
    localStorage.setItem('react-events-data', JSON.stringify(events));
}, [events])

  return (
    <div className={`${dark && 'dark'}`}>
        <div className="container">
        <HeaderEvent darkHandler={setDark}/>
        <AddEvent addEventHandler={addEventHandler}/>
        <ListEvent events={events.filter((event) => event.title.toLowerCase().includes(searchEvent))} deleteEventHandler={deleteEventHandler} searchEventHandler={setSearchEvent} doArchive={doArchive}/>
        </div>
      </div>
  );
}

export default App;