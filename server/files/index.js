module.exports=({Bikes,Autos,Cars,Unpaid,Cash,Digital})=>{
    const totalVehicles=parseInt(Bikes)+parseInt(Autos)+parseInt(Cars);
    const total=parseInt(Cash)+parseInt(Digital);
    const date=new Date();
    return `
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
    </head>
    <style>
      table,th,td{
    border:1px solid grey ;
    padding:0;
    margin:0;
    border-collapse:collapse;
    font-family:Montserrat;
    color:#050505;
  }
  th{
    text-decoration:underline;
  }
      </style>
    <body>
      <table style="width:50%" >
   <tr>
     <td>Date: ${`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
   </tr>
         <tr>
     <td style="background-color:lightgrey;">No. of Bikes: ${Bikes}</td>
   </tr>
         <tr>
     <td>No. of Autos: ${Autos}</td>
   </tr> 
        <tr>
     <td style="background-color:lightgrey;" >No. of Cars: ${Cars}</td>
   </tr> 
        <tr>
     <td>Total: ${totalVehicles}</td>
   </tr>
        <tr>
     <td style="background-color:lightgrey;" >Unbilled: ${Unpaid}</t>
   </tr>
    <tr>
     <th>Collection</th>
   </tr>
          <tr>
     <td style="background-color:lightgrey;" >Cash: ₹${Cash}</td>
   </tr>
          <tr>
     <td>Digital: ₹${Digital}</td>
   </tr>
          <tr>
     <td style="background-color:lightgrey;" >Total: ₹${total}</td>
   </tr>
  </table>
    </body>
  </html>
    `;
};