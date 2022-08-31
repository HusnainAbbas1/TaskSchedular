const createTask = require('../Models/createTasks');
const managerChild = require('../Models/TeamLead');
const { sendResponse } = require('../utils/response');


exports.createUser = async(req,res)=>{
    const {userName,role,currentProject,skills,projectDescription,leadId,password} = req.body;
  
 
 console.log(req.body);
 const savedUser  = await managerChild.create(req.body);
 
sendResponse(1,200,'created User',{},res);

}
exports.getAllManagerChilds =async (req,res)=>{
 
    const Users = await managerChild.find();
    console.log(Users);
    res.status(200).json({
        Users
    });
    // sendResponse(1,304,'fetch all users succsfully ',Users,res);

}
exports.deleteUser = async(req,res) =>{

    const {id} =req.params;
    console.log(req.params);
    const delUser = await managerChild.findById(id);
    if(!delUser){
        sendResponse(0,404,'user not found',{},res);
    }

    await delUser.remove();
    sendResponse(1,200,'deleted user sucessfully',delUser,res);

}
exports.updateUser = async (req,res)=>{
    
   console.log(req);
    updatedTask = await managerChild.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      sendResponse(1,200,'updated succesfully',updatedTask,res);

}
exports.getUnAssignedUsers =async (req,res)=>{
    console.log('from unassigned ... users');
    const unAssignedUsers = await managerChild.find({leadId:0});
    console.log(unAssignedUsers);
    
   res.status(200).json({
    success:true,
    message:'lead id 0',
    unAssignedUsers
   }) ;

    // sendResponse(1,304,'fetch all unassigned  users succsfully ',unAssignedUsers,res);

}
exports.createTask= async (req,res)=>{
    console.log('task',req.body);
    let {projectName,taskDescription,leadId,} = req.body;
    const createdTask =await createTask.create(req.body);
   
    body = {
        currentProject:projectName,
        projectDescription:taskDescription,
        leadId:leadId,
    }

    updatedTask = await managerChild.findByIdAndUpdate(req.body.assigneeId, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });


    sendResponse(1,200,'updated sucessfully',createdTask,res);
}
exports.changeTaskStatus = async (req,res)=>{
    
    console.log('from checkbox',req.body);

     updatedProfileCard = await managerChild.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
         useFindAndModify: false,
       });

    const id = req.body.taskId;
 
       updatedTaskStatus = await createTask.findByIdAndUpdate(id,req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })


       sendResponse(1,200,'updated succesfully',updatedTaskStatus,res);
 
 }
exports.todayTasks = async (req,res) => {
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tasks = await createTask.find({createdAt: {$gte: today}});
    
    console.log('tasks...........',tasks);
    res.status(200).json({
        tasks
    })
    
    // const tasks = await createTask.
 }