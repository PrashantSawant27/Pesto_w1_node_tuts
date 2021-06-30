const express=require('express');
const app=express();
app.use(express.json());

let assigments=[{
    id:1,
    title:"Search and finalise React js course",
    description:"Search and finalise React js course"
},
{
    id:2,
    title:"Study express js for creating api",
    description:"Study express js for creating api"
},
{
    id:3,
    title:"Study how to host Express     js app on heroku",
    description:"Study how to host node js app on heroku"
}];


app.get('/api/assignments',(req,res)=>{
    sendResponse(res,assigments,200);
});

app.get('/api/assignments/:id',(req,res)=>{
    const asg=assigments.find(c=>c.id==parseInt(req.params.id));
    if(!asg)
        sendResponse(res,"Assignment with given id is not found",404);
    else
        sendResponse(res,asg,200);
});

app.post('/api/assignments',(req,res)=>{

    if(!req.body.title || !req.body.description)
        sendResponse(res,"Title and description are required",400);
    else{
        const asg={id:assigments.length+1,title:req.body.title,description:req.body.description};
        assigments.push(asg);
        sendResponse(res,asg,201);
    }

});

app.put('/api/assignments/:id',(req,res)=>{
    if(!req.params.id)
        sendResponse(res,"Id is required",400);
    else if(!req.body.title || !req.body.description)
        sendResponse(res,"Title and description are required",400);
    else{
        const asg=assigments.find(c=>c.id==parseInt(req.params.id));

        if(!asg)
            sendResponse(res,"Assignment with given id is not found",404);
        asg.title=req.body.title;
        asg.description=req.body.description;


        sendResponse(res,asg,200);
    }

});

app.delete('/api/assignments/:id',(req,res)=>{
    if(!req.params.id)
        sendResponse(res,"Id is required",400);
    else{
        const asg=assigments.find(c=>c.id==parseInt(req.params.id));

        if(!asg)
            sendResponse(res,"Assignment with given id is not found",404);
        
        assigments.splice(assigments.findIndex(c=> c.id==asg.id),1);

        sendResponse(res,"deleted assignment with id "+req.params.id,200);
    }

});



app.get('/',(req,res)=>{
    sendResponse(res,"Home page");
});

function sendResponse(res,body,status=200){
    res.status(status).send(body);
}

// const hostname = '127.0.0.1';
const port= process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at ${port}/`);
});