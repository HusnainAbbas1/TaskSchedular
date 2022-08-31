const createTask = require("../Models/createTasks");
const { sendResponse } = require("../utils/response");

exports.getALLTasks = async (req, res) => {
  console.log('query .......................... ....................',req.query);
  const { page, pageSize ,filterby} = req.query;

  const countAllTasks = await createTask.countDocuments();

  if(filterby == 'all'){
    console.log('all .......................... ....................',req.query);
  const taskList = await createTask
    .find()
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .then((getAllTasks) => {
      totalPages = Math.ceil(countAllTasks / pageSize);
      
      console.log(totalPages);
      body = {
        page,
        totalPages,
        pageSize,
        getAllTasks,
        countAllTasks,
      };
    
       sendResponse(1, 200, "all cards are fetched sucessfully", body, res);
    
    });
  }else{
    console.log('today .......................... ....................',req.query);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const taskList = await createTask.
    find({createdAt: {$gte: today}})
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .then((getAllTasks) => {
      totalPages = Math.ceil(countAllTasks / pageSize);
      
      console.log(totalPages);
      body = {
        page,
        totalPages,
        pageSize,
        getAllTasks,
        countAllTasks,
        
      };
    
       sendResponse(1, 200, "all cards are fetched sucessfully", body, res);
    
    });

  }
};

exports

exports.createSchedule = async (req, res) => {
  const createdTask = await createTask.create(req.body);

  res.status(201).json({
    sucess: true,
    message: "created sucessfully",
  });
};

exports.deleteSchedule = async (req, res) => {
  const id = req.params.id;
  const task = await createTask.findById(id);

  if (!task) {
    res.status(500).json({
      sucess: false,
      message: "task not found",
    });
  }

  await task.remove();

  res.json({
    sucess: true,
    message: "deleted sucessfully",
  });
};

exports.updateSchedule = async (req, res) => {
  updatedTask = await createTask.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  console.log(updatedTask);

  res.status(200).json({
    sucess: true,
    message: "updated sucessfully",
  });
  
};
