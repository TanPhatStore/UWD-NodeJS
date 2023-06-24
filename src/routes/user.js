
const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
const middlewareControllers = require('../app/controllers/middlewareControllers')
const userControllers = require('../app/controllers/userControllers')

router.get('/current-user', middlewareControllers.verifyToken ,userControllers.getCurrentUser)
router.post('/upload-new-avatar', middlewareControllers.verifyToken, upload.single('image') , userControllers.updateAvatar)
router.delete('/delete-avatar', middlewareControllers.verifyToken , userControllers.deleteAvatar)
router.put('/update-email', middlewareControllers.verifyToken , userControllers.updateEmail)
router.put('/update-password', middlewareControllers.verifyToken , userControllers.updatePassword)
router.put('/update-profile', middlewareControllers.verifyToken , userControllers.updateProfile)
router.delete('/delete-user', middlewareControllers.verifyToken , userControllers.deleteUser)
module.exports = router