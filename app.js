const fs =require('fs')
const express=require('express');

const app=express();
app.use(express.json())

// app.get('/',(req,res)=>{
//  res
//  .status(200)
//  .json({message:"Hello from the server side!",app:"Natours"});
// })
// app.post('/',(req,res)=>{
//     res.sendStatus("you can't this post endpoints ...")
    
//    })
//===================//
const tours =JSON.parse(
fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length,
    data:{
        tours
    }    
    })

});

//get call//
app.get('/api/v1/tours/:id/:x/:y?',(req,res)=>{
    console.log(req.params);
    const id=req.params.id*1;
    const tour=tours.find(el => el.id ===id);
    // if(id>tours.length){
        if(!tour){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }

    
    
    res.status(200).json({
        status:'success',
        // results:tours.length,
    data:{
        tour
    }    
    });
});

//post call//
app.post('/api/v1/tours',(req,res)=>{
    // console.log(req.body);
    const   newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id : newId },req.body);
    
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
     res.status(201).json({
        status:'success',
        data:{
            tour:newTour
        }
     })
    })
    // res.send('DONE TO SUCEESS');
});

// upadte put call//
// app.patch('/api/v1/tours/id',(req,res)=>{
//     if(req.params.id*1>tours.length){
//         return res.status(404).json({
//             status:'fail',
//             message:'Invalid ID'
//         });
//     }
//     res.status(200).json({
//         status:'success',
//         data:{
//             tour:'<Updated tour here...>'
//         }
//     })
    
// })

app.delete('/api/v1/tours/id',(req,res)=>{
    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    res.status(204).json({
        status:'success',
        data:{
            data:null
        }
    })
    
})

const port=3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}.......`)
})
/*const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});*/
