import express from 'express';
const router = express.Router();
import { getuserProfile,hi,deleteContact,sendConnectionRequest ,acceptConnectionRequest,isInContacts,addContact,getContacts} from '../controler/usersControlers.js';
import { protectRoute } from '../middleware/auth.js';

router.get('/getUserProfile/:username',protectRoute,getuserProfile);
router.post('/connect/:userId',protectRoute,sendConnectionRequest);
router.put('/accept/:userId',protectRoute,acceptConnectionRequest);
router.post('/addContact/:userId',protectRoute,addContact);
router.get('/getContacts',protectRoute,getContacts);
router.get('/isInContacts/:userId',protectRoute,isInContacts);
router.put('/removeContact/:userId',protectRoute,deleteContact);
router.get('/hi',protectRoute,hi);
export default router;