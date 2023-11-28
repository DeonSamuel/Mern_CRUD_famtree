const TaskModel = require("../models/TaskModel")

module.exports.getTasks = async (req,res) =>{
    const tasks = await TaskModel.find()
    res.send(tasks)
}

module.exports.saveTask =  (req,res) =>{
   const {task, relation, age, gender} = req.body

   TaskModel.create({task, relation, age, gender})
   .then((data) => {
   console.log("Saved Successfully...");
   res.status(201).send(data);
   }).catch((err) =>{
    console.log(err);
    res.send({error:err, msg:"Something went wrong!"})
   })
};


module.exports.updateTask =  (req,res) =>{
    const {id} = req.params 
    const {task, relation, age, gender} = req.body
 
    TaskModel.findByIdAndUpdate(id,{task, relation, age, gender})
    .then(() => res.send("Updated Successfully!"))
    .catch((err) =>{
     console.log(err);
     res.send({error:err, msg:"Something went wrong!"})
    })
 };

 module.exports.deleteTask =  (req,res) =>{
    const {id} = req.params 
 
    TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted Successfully!"))
    .catch((err) =>{
     console.log(err);
     res.send({error:err, msg:"Something went wrong!"})
    })
 };