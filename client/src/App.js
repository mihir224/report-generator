import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import './App.css';

function App() {
   const [data,setData]=React.useState({
    Bikes:0,
    Autos:0,
    Cars:0,
    Unpaid:0,
    Cash:0,
    Digital:0
  });
  function handleChange({target:{value,name}}){ //de-structuring synthetic event object to use only the target object
    setData({
      ...data,
      [name]:value
    });
  }
  function handleClick(){
    axios.post("/generate-pdf",data)
      .then(()=> axios.get('/fetch-report',{responseType:'blob'}))
      .then((res)=>{
        const reportBlob=new Blob([res.data],{type:'application/pdf'})
        saveAs(reportBlob,'report.pdf');
      })
    }
  return (
    <div className="App">
     <input type="number" placeholder="Bikes" name="Bikes" onChange={handleChange}></input>
     <input type="number" placeholder="Autos" name="Autos" onChange={handleChange}></input>
     <input type="number" placeholder="Cars" name="Cars" onChange={handleChange}></input> 
     <input type="number" placeholder="Unpaid Amount" name="Unpaid" onChange={handleChange}></input>
     <h3>Collections from different payment modes</h3>
     <input type="number" placeholder="Cash" name="Cash" onChange={handleChange}></input>
     <input type="number" placeholder="Digital" name="Digital" onChange={handleChange}></input>
     <button onClick={handleClick}>Generate PDF</button>
    </div>
  );
}

export default App;
