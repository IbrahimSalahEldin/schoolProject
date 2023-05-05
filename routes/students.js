const router = express.Router();

//validation ;;

const { authAdmin , authTeacher } = require('../middlewares/auth');

const admin=require("../controllers/users/adminController");

router.post('/',[ authAdmin ,   upload('userProfil').single('photo') ], admin.create);

router.get('/',authTeacher, admin.get);


router.put('/id/',[ authAdmin , upload('userProfil').single('photo')], admin.Edit);

router.delete('/:id',authAdmin , admin.delete);


module.exports =  router;
