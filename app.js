const express=require('express')
const port=5500
const app=express()
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
let taskData=[]
app.get('/',(req,res)=>{
    res.render('index',{taskData})
})
app.post('/insert',(req,res)=>{
    if(req.body.taskid){
        taskData.forEach((task)=>{
            console.log(req.body.taskname)
            if(req.body.taskid==task.id){
                task.name = req.body.taskname
            }
        })
    } else {
        taskData.unshift({
            id:Math.random().toString().slice(2,11),
            name:req.body.taskname
        })
    }
    return res.redirect('/')
})
app.get('/delete',(req,res)=>{
    let del=taskData.filter((task)=> task.id!=req.query.id )
    taskData=del
    return res.redirect('/')
})
app.listen(port)