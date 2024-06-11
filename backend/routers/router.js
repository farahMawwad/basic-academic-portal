const express = require("express");
const userController = require("../controller/controller.js");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route('/CourseView').get(userController.CourseView);
router.route('/mySubject').get(userController.mySubject);
router.route('/editCourse/:id').patch(userController.editCourse);
router.route('/add_student').post(userController.add_student);
router.route('/test').post(verifyToken, (req, res) => {
    res.json({authData:req.authData});
  });

module.exports = router;