import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import './App.css';
import Papa from  'papaparse';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function App() {
   const [data,setData]=React.useState({
    Bikes:0,
    Autos:0,
    Cars:0,
    Unpaid:0,
    Cash:0,
    Digital:0
  });
   const [col,setCol]=React.useState([]);
   const [values,setValues]=React.useState([]);


    function handleChange(event){
      alert('file uploaded!')
      Papa.parse(event.target.files[0],{
        header:true,
        skipEmptyLines:true,
        complete:function(result){
          const columnArray=[];
          const valuesArray=[];
          result.data.map((d)=>{
            columnArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
          setData(result.data);
          setCol(columnArray[0]);
          setValues(valuesArray);
        }
      })
    }

    React.useEffect(()=>{
      var countBike=0;
      var countCar=0;
      var countAuto=0;
      var countCash=0;
      var countDigital=0;
     for(var i=0;i<values.length;i++){
       for(var j=0;j<values[i].length;j++){
         if(values[i][j]==='Bike'){
           col.map((val,index)=>{
             if(val==='Pricing'){
              countBike+=parseFloat(values[i][index]);
             }
           })
           
         }
         else if(values[i][j]==='Car'){
          col.map((val,index)=>{
            if(val==='Pricing'){
             countCar+=parseFloat(values[i][index]);
            }
          })
         }
         else if(values[i][j]==='Auto'){
          col.map((val,index)=>{
            if(val==='Pricing'){
             countAuto+=parseFloat(values[i][index]);
            }
          })
         }
         else if(values[i][j]==='CashPayment'){
          col.map((val,index)=>{
            if(val==='Total'){
             countCash+=parseFloat(values[i][index]);
            }
          })
         }
         else if(values[i][j]==='DigitalPayment'){
          col.map((val,index)=>{
            if(val==='Total'){
             countDigital+=parseFloat(values[i][index]);
            }
          })
         }
       }
     }
     const unpaid=parseFloat((countCash)+(countDigital))-((countBike)+(countAuto)+(countCar));
        setData({
          Bikes:countBike.toFixed(2),
          Autos:countAuto.toFixed(2),
          Cars:countCar.toFixed(2),
          Unpaid:unpaid.toFixed(2),
          Cash:countCash.toFixed(2),
          Digital:countDigital.toFixed(2)
        });
    },[col,values]);
    
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
    <div className="inputDiv">
    <label id="uploadLabel" htmlFor="fileUpload"><UploadFileIcon id="uploadLabelIcon"  />Upload CSV File</label>
     <input id="fileUpload" type="file" name="file" accept=".csv" onChange={handleChange}/>
     </div>
     <div>
     <button id="generateBtn" onClick={handleClick}>Generate PDF</button>
     </div>
    </div>
  );
}

export default App;
