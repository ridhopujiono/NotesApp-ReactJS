import { useState } from "react";
import { useEffect } from "react";
import {nanoid} from 'nanoid';
import AddEvent from "./components/AddEvent";
import HeaderEvent from "./components/HeaderEvent";
import {Routes, Route} from "react-router-dom";
import Create from './views/Create'
import Main from './views/Main'
import Detail from './views/Detail'
import PageNotFound from './views/PageNotFound'
import { useNavigate } from "react-router-dom";



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

 const [events, setEvents] = useState([
   {
    id: nanoid()+new Date().getTime(),
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: formatMyDate('2022-04-14T04:27:34.572Z'),
    archived: false,
  },
  {
    id: nanoid()+new Date().getTime(),
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    createdAt: formatMyDate('2022-04-14T04:27:34.572Z'),
    archived: false,
  },
  {
    id: nanoid()+new Date().getTime(),
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    createdAt: formatMyDate('2022-04-14T04:27:34.572Z'),
    archived: false,
  },
  {
    id: nanoid()+new Date().getTime(),
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
    createdAt: formatMyDate('2022-04-14T04:27:34.572Z'),
    archived: false,
  },
  {
    id: nanoid()+new Date().getTime(),
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    createdAt: formatMyDate('2022-04-14T04:27:34.572Z'),
    archived: false,
  },
  {
    id: nanoid()+new Date().getTime(),
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    createdAt: formatMyDate('2022-04-14T04:27:34.572Z'),
    archived: false,
  },
 ]);

const addEventHandler = (title, body) =>{
  const date = new Date();
  const newData = {
    id: nanoid() + new Date().getTime(),
    title: title,
    body: body,
    createdAt: date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    archived: false
  };
  const newDatas = [...events, newData];
  setEvents(newDatas);
  navigate('/');
}
const deleteEventHandler = (id) =>{
  const newData = events.filter((event) => 
    event.id !== id
  );
  setEvents(newData);
}
const doArchive = (type, id) => {
  let getData = [...events];
  let getIndex = getData.findIndex(x => x.id === id);

  if(type == true){
    getData[getIndex].archived = true; 
  }else{
    getData[getIndex].archived = false; 
  }
  setEvents(getData)
  navigate('/');
}
const detailHandler = (eventId) => {
  let result = events.filter((data) => 
      data.id == eventId
  );
  return result;
}
// useEffect(() => {
//     const savedEventsFromLocal = JSON.parse(
//         localStorage.getItem('react-events-data')
//     );
//     if(savedEventsFromLocal){
//       if(savedEventsFromLocal.length != 0){
//         setEvents(savedEventsFromLocal)
//       }
//     }
// }, []);
// useEffect(()=>{
//     localStorage.setItem('react-events-data', JSON.stringify(events));
// }, [events])

  return (
    
    <div className={`${dark && 'dark'}`}>
      <div className="container">
        <HeaderEvent darkHandler={setDark}/>
        <Routes>
          <Route path="/" element={<Main events={events.filter((event) => event.title.toLowerCase().includes(searchEvent))} deleteEventHandler={deleteEventHandler} searchEventHandler={setSearchEvent} doArchive={doArchive}/>}>
          </Route>
          
          <Route path="/add" element={<Create addEventHandler={addEventHandler} />} /> 
          <Route path="/detail/:eventId" element={<Detail detailHandler={detailHandler} doArchive={doArchive}/>} /> 
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
