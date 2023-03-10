const express=require('express');
const bodyParser=require('body-parser');
const pdf=require('html-pdf');
const cors=require('cors');
const template=require('./files');
const path=require('path');

const app=express();
const port=process.env.port||3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'build')));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
});
app.post('/generate-pdf',function(req,res){
    pdf.create(template(req.body),{}).toFile('report.pdf',(err)=>{
        if(err){
           res.send(Promise.reject());
        }     
        res.send(Promise.resolve());
    });
});
app.get('/fetch-report',function(req,res){
    res.sendFile(__dirname+"/report.pdf");
});
app.listen(port,()=>{
    console.log('Server started on port ' + port);
});
