// import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  // const [serverData, setServerData] = useState('');

  // useEffect(() => {
  //   // async function readServerData() {
  //   //   const resp = await fetch('/api/hello');
  //   //   const data = await resp.json();

  //   //   console.log('Data from server:', data);

  //   //   // setServerData(data.message);
  //   // }

  //   // readServerData();
  // }, []);

  return (
    <>
      <NavBar />
    </>
  );
}
