const createTask = require("../Models/createTasks");

exports.getALLTasks = async (req, res) => {
  const getAllTasks = await createTask.find();

  res.status(200).json({
    sucess: true,
    getAllTasks,
  });
};

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
