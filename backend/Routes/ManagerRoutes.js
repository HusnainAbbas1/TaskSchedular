const express = require("express");
const {
  createUser,
  getAllManagerChilds,
  deleteUser,
  updateUser,
  getUnAssignedUsers,
  createSchedule,
  createTask,
  changeTaskStatus,
  todayTasks,
} = require("../Controllers/ManagerController");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.route("/create_user").post(checkAuth, createUser);
router.route("/get_all_users").get(checkAuth, getAllManagerChilds);
router.route("/delete_user/:id").delete(checkAuth, deleteUser);
router.route("/update_user/:id").put(checkAuth, updateUser);
router.route("/get_all_unassigned_users").get(checkAuth, getUnAssignedUsers);
router.route("/create_task").post(checkAuth, createTask);
router.route("/change_task_status/:id").put(checkAuth, changeTaskStatus);
router.route("/today_tasks").get(checkAuth, todayTasks);

module.exports = router;
