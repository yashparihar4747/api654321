const express = require('express');
const router = express.Router();

const { userFeedback,getAllFeedback,editFeedback,deleteFeedback } = require("../controllers/feedbackController");
router.post('/feedback', userFeedback);
router.get('/feedback/get', getAllFeedback);
router.put('/feedback/edit/:id', editFeedback);  
router.delete('/feedback/delete/:id', deleteFeedback);

module.exports = router;
