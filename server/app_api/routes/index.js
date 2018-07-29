var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});



var ctrlProfile = require('../controllers/profile');
var ctrlExpression = require('../controllers/expression');
var ctrlContext = require('../controllers/context');
var ctrlsimilarExp = require('../controllers/similarExp');
var ctrlComic = require('../controllers/comicBook');
var ctrlTrans = require('../controllers/transcript');
var ctrlVideo = require('../controllers/video');
var ctrlBookmark = require('../controllers/bookmarkExp');
var ctrllikeDislik = require('../controllers/like_dislike');

//////////////////////////////////////////////////////
// Changes 
var ctrlConfluence = require('../controllers/confluence/Parentconfluence');

//Expression
router.post('/add_expression',ctrlExpression.addExpression);
// router.post('/add_expression_from_confluence',ctrlExpression.ctrlConfluence);


router.get('/getAll', ctrlConfluence.ParseConfluence);

router.get('/get_expression',ctrlExpression.getExpression);

router.get('/get_expression/:expID',ctrlExpression.getExpressionByID);
router.put('/update_expression/:expID',ctrlExpression.ExpressionEdit);
router.put('/active_expression/:expID',ctrlExpression.ExpAcive); //activeor deactive exp
router.delete('/del_expression/:expID',ctrlExpression.DeleteExpressionByID);

//get expression with context 
router.get('/get_exp_with_context', ctrlExpression.getallExpressionwithContext)

//Expression Context
router.post('/context',ctrlContext.addExpContext);
router.get('/context/:ExpID',ctrlContext.getExpContext);
router.get('/context/:cntxtID',ctrlContext.getExpContextByID);
router.put('/context/:cntxtID',ctrlContext.ExpContextEdit); //only for moderater
router.put('/active_context/:cntxtID',ctrlContext.ExpContextAcive);//activeor deactive exp context
router.delete('/context/:cntxtID',ctrlContext.DeleteExpContextByID);

//For support
router.get('/contextHistory/:cntxtID',ctrlContext.getExpContextByID_Support);
router.put('/contextHistory/:cntxtHisID',ctrlContext.Exp_Context_VersionHistoryEdit); //only for Support





//Add Similar Expression
router.post('/similarExp',ctrlsimilarExp.addExpSame);
router.get('/similarExp/:expID/:cntxtID',ctrlsimilarExp.getsimilarEXp);
router.get('/similarExp/:similID',ctrlsimilarExp.getsimilarEXpByID);
router.put('/similarExp/:similID',ctrlsimilarExp.edit_similarEXp);
router.delete('/similarExp/:similID',ctrlsimilarExp.DeletesimilarEXpByID);



//Comic Book
router.post('/comic',ctrlComic.addComic);
router.get('/comic',ctrlComic.getComic);
router.get('/comic/:comicID',ctrlComic.getComicByID);
router.put('/comic/:comicID',ctrlComic.EditComic);
router.delete('/comic/:comicID',ctrlComic.DeleteComicByID);

router.get('/comicbyExpID/:expID',ctrlComic.getComicbyExpID);

router.post('/get_comic_expression_data',ctrlComic.get_comic_expressionData);


//Video
router.post('/video',ctrlVideo.addVideo);
router.get('/video',ctrlVideo.getVideo);
router.get('/video/:vidID',ctrlVideo.getVideoByID);
router.put('/video/:vidID',ctrlVideo.EditVideo);
router.delete('/video/:vidID',ctrlVideo.DeleteVideoByID);


//Transcript
router.post('/transcript',ctrlTrans.addTranscript);
router.get('/transcript',ctrlTrans.getTranscript);
router.get('/transcript/:transcID',ctrlTrans.getTranscriptID);
router.put('/transcript/:transcID',ctrlTrans.EditTranscript);
router.delete('/transcript/:transcID',ctrlTrans.DeleteTranscriptByID);






// profile

router.get('/profile', auth, ctrlProfile.profileRead);

router.put('/profile', ctrlProfile.profileEdit);
router.get('/checkUserName', ctrlProfile.checkUserName);
router.get('/get_allusers', ctrlProfile.allprofileRead);


//Bookmark Expression
router.post('/bookmark_exp',ctrlBookmark.addBookMarkExp);
router.get('/bookmark_exp/:userID',ctrlBookmark.getBookMarkExp); //get all bookmark exp of users
router.delete('/bookmark_exp/:bookMrkID',ctrlBookmark.DeleteBookmarkExpByID);


//Blacklist Expression
router.post('/blacklist_exp',ctrlBookmark.addBlackListExp);
router.get('/blacklist_exp/:userID',ctrlBookmark.getBlackListExp); //get all Blacklisted Expression exp of users
router.delete('/blacklist_exp/:bookMrkID',ctrlBookmark.DeleteBlackListExpByID);



//Like And Dislike

router.post('/alike',ctrllikeDislik.addLike);



module.exports = router;
