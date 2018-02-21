const express = require('express');
const router = express.Router();

const ForumPost = require('../models/forumpost');

router.post('/newPost', function(req, res) {
	ForumPost.create({
		title: req.body.title,
    body: req.body.body,
		createdBy: req.body.createdBy
		}, function(err){
		if(err){
			res.send(err);
		} else {
			res.send("User Created")
		}
	});
});

router.put('/addComment', function(req, res) {
	ForumPost.find({_id: req.body.postId}, function(err, post){
        if(post.length == 0){
        	console.log("not found");
          res.send({"response": "Post Not Found"});
        } else{
					console.log(post[0]);
					if(req.body.title == null || req.body.body == null || req.body.createdBy == null){
						// If JSON Web Tokens were implemented, we would use the tokens username value as createdBy
						// This is where we can input constraints for title or body.
						res.send("Invalid Args");
					} else {
						post[0].responses.push(
						{
							 body: req.body.body,
							 user: req.body.createdBy,
							 time: new Date()
						}
						);
						post[0].save();
						res.send("Comment Added");
					}
        }
    });

});

router.put('/solvePost', function(req, res) {
	ForumPost.find({_id: req.body.postId}, function(err, post){
        if(post.length == 0){
        	console.log("not found");
            res.send({"response": "Post Not Found"});
        } else{
           post.solved = true;
					 res.send({"response": "Post is now solved"})
        }
    });
});

router.get('/all', function(req, res) {
	ForumPost.find(function(err, posts) {
            if (err)
                res.send(err)
            else
                res.json(posts);
        });
});

router.delete('/deletePost', function(req, res) {
	console.log(req.body.postId);
	ForumPost.remove({
      _id : req.body.postId
  }, function(err, review) {
    if(err || review.n == 0){
      res.send("Post Not Found");
    } else {
      res.send("Post Deleted");
    }
  });

});

module.exports = router;
