const router = require('express').Router();
const PetController = require('../controllers/PetController');
require("../services/cloudinary.config");

// middlewares
const verifyToken = require('../helpers/verify-token');
// const { imageUpload } = require('../helpers/image-upload');
const { imageUpload } = require('../helpers/image-cloudnary');

router.post('/create', verifyToken, imageUpload.array('images'), PetController.create);
router.get('/mypets', verifyToken, PetController.getAllUserPets);
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions);
router.patch('/schedule/:id', verifyToken, PetController.schedule);
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption);
router.get('/:id', PetController.getPetById)
router.delete('/:id',verifyToken , PetController.removePetById)
router.patch('/:id',verifyToken,  imageUpload.array('images') , PetController.updatePet)
router.get('/', PetController.getAll);

module.exports = router;