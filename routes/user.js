const express = require('express');
const { handleGetAllUser , handlGetUserById , handleUpdateUserById , handledeleteUserById , handleCreateUser}=require('../controllers/user')
const router = express.Router() ; 


// router.get('/', handleGetAllUser)
// router.post('/',handleCreateUser)

router.route('/').get(handleGetAllUser).post(handleCreateUser) ;
router.route('/:id')
.get(handlGetUserById)
.patch(handleUpdateUserById)
.delete(handledeleteUserById)



module.exports=router;

