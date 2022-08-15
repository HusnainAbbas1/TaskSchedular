const express = require('express')
const router = express.Router();

const { Authentiaction, createUser} = require("../Controllers/AuthControllers");
 
router.route('/login').post( Authentiaction);
router.route('/createuser').post(createUser);

module.exports = router;
