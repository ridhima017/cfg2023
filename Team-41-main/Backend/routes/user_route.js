const express = require('express') 

const {
  AddTreeController,
  getAllTreesController,
  loginController,
  registerController,
  AddLakeController,
  addEvent,
  getAllEvents,
  signoutController,
} = require("../controllers/user_controller");

const router = express.Router()

const upload = require("../middleware/upload_picture")

router.get("/", async (req, res) => {
  res.render("Auth");
});
router.post('/login' , loginController);
router.post('/register' , registerController);
// Add Entry 
router.post("/AddTree",upload.single('picture'), AddTreeController);  

router.get('/GetAll' , getAllTreesController);  

router.get("/AddTree",async(req,res)=>{
    res.render("AddTree")
})
router.get("/AddLake", async (req, res) => {
  res.render("AddLake");
});

router.get("/Signout",signoutController);

router.post("/AddLake", upload.single("picture"), AddLakeController);


router.get("/About", async (req, res) => {
  res.render("About");
});

router.post("/getTreeByPin", getAllTreesByPinCode);

router.post("/getTreeBySpc", getAllTreesBySpecies);

router.post("/AddEvent",addEvent);
router.post("/getTreeByPin", getAllTreesByPinCode);

router.post("/getTreeBySpc", getAllTreesBySpecies);

router.get("/GetAllEvents",getAllEvents)
module.exports = router

