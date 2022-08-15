const express = require('express');
const router = express.Router();
 
const { getALLTasks, createSchedule, deleteSchedule, updateSchedule } = require('../Controllers/schedularTasksController');
const checkAuth = require("../middleware/check-auth");

router.route('/get_all_tasks').get(checkAuth, getALLTasks);
router.route('/create_schedule').post(checkAuth,createSchedule);
router.route('/delete_schedule/:id').delete(checkAuth,deleteSchedule);
router.route('/update_schedule/:id').put(checkAuth,updateSchedule)
module.exports = router;

