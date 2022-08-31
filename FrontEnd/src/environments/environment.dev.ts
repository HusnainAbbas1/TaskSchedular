export const environment = {
    production: false,
   
    //Auth Routes
    loginURL: 'http://localhost:9002/api/v1/auth/login',
    createUserURL:'http://localhost:9002/api/v1/auth/createuser',
    
    //Tasks Routes
    getAllPosts:'http://localhost:9002/api/v1/scedular/get_all_tasks',
    createSchedule:'http://localhost:9002/api/v1/scedular/create_schedule',
    deleteSchedule:'http://localhost:9002/api/v1/scedular/delete_schedule',
    updateSchedule:'http://localhost:9002/api/v1/scedular/update_schedule',
    
   //Manager Operations Routes
    createUser:'http://localhost:9002/api/v1/manager/create_user',
    getAllManagerChilds:'http://localhost:9002/api/v1/manager/get_all_users',
    deleteUser:'http://localhost:9002/api/v1/manager/delete_user',
    UpdateUser:'http://localhost:9002/api/v1/manager/update_user',
    unAssignedUsers:'http://localhost:9002/api/v1/manager/get_all_unassigned_users',
    managerCreateTask:'http://localhost:9002/api/v1/manager/create_task',
    changeTaskStatus:'http://localhost:9002/api/v1/manager/change_task_status',
    todayTasks:'http://localhost:9002/api/v1/manager/today_tasks'
  };

  