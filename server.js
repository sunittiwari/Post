var express = require('express'),
    app = express(),
    cors = require('cors'),

    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    MongoClient = require('mongodb').MongoClient,
  
    mongodb_conn ='mongodb://localhost/';
var db =''; 
var ObjectId = require('mongodb').ObjectID;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use(cors({
        origin:'http://localhost:4200'
}));    

MongoClient.connect(mongodb_conn,function(err,client){
    if(err){
        throw err;
        console.log(err);
    }else
    console.log("Conneted to MongoDB");
    app.listen(3000,function(){
        console.log(' Node_JS Server Started');
    }); 
    db = client.db('angular2');
})


    

app.post('/login',function(req,res){
    
    console.log('login method works');
    console.log(req.body);
     db.collection('users').findOne({username: req.body.username, password: req.body.password},function(err,data){
      if(!err){
         
        if(data){
            var token = jwt.sign({username:req.body.username},'Happy-go-lucky',{
               'expiresIn' : '1h'
            });
            res.send({
                flag: true,
                username:req.body.username,
                token:token
            })
        }
            else{
                res.send({
                    flag: false
                })  
            }
        }
        else{
            res.send(err);
        }    //         console.log(data);
       
     })    
});

app.use(function(req,res,next){
    console.log(req.headers['authtoken']);
    var token = req.body.authtoken||req.query.authtoken||req.headers['authtoken'];
    jwt.verify(token,'Happy-go-lucky',function(err,sucess){
        console.log(err);
        if(!err){
            req.sucess = sucess;
            console.log(sucess);
            next(); 
        }else{
            res.send({
                err:true,
                msg: "Invalid Request"
            })
        }
    });
});

app.post('/createpost',function (req,res){
    console.log(req);
    console.log(req.sucess.username);
    console.log('Hitting create');
    db.collection('posts').insert({
        userName: req.sucess.username,
        postTitle : req.body.postTitle,
        postDescription :req.body.postDescription
    },function(err,data){
        if(!err){
            res.send({
                flag : true
                
            });      
        }else{
            res.send({
                flag: 'Some error occured'
            })
        }
        

    })
});
app.get('/getpost',function(req,res){
    console.log('hello');
db.collection('posts').find().toArray(function(err,data){
        if(err){
            res.send({
                flag :false,
                err
            })
        }else{
            res.send({
                flag : true,
                data
            })
        }
    })

});

app.post('/getcomments',function(req,res){
    console.log("getcomments");
    console.log(req);
db.collection('posts').findOne({_id:ObjectId(req.body._id)},function(err,succes){
    if(!err){
        res.send({
            flag:true,
            data:succes
        })
        console.log(succes);
    }else{
        flag:false,
        res.send(err);
        console.log(err);
    }

    })
});
app.post('/addComment',function(req,res){
    console.log("addComment");
    console.log(req);
    db.collection('posts').updateOne({_id:ObjectId(req.body._id)},{$push: {comments: req.body.comment}},function(err,data){
        if(err){
            res.send({
                flag:false,
                err
            })
        }else{
            res.send({
                flag:true,
                succes:data
            })
        }
    })
});
app.post('/updatePost',function(req,res){
    console.log('updatePost');
    console.log(req);
    db.collection('posts').updateOne({ _id:ObjectId(req.body._id)},{$set:{postTitle:req.body.postTitle,postDescription:req.body.postDescription}},function(err,succes){
        if(err){
            res.send({
                flag:false,
                err 
            })
        }else{
            res.send({
                flag:true,
                data:succes
            })
        }
    })    
});
app.post('/onDelete',function(req,res){
    console.log('onDelete');
    console.log(req);
    db.collection('posts').deleteOne({_id:ObjectId(req.body._id)},function(err,succes){
        if(err){
            res.send({
                err
            })
            console.log(err);
        }else{
            res.send({
                flag:true,
                data:succes
            })
        }
    })
})

app.post('/likes',function(req,res){
    console.log(req);
    console.log(req.sucess.username);
db.collection('posts').updateOne({ _id:ObjectId(req.body._id)}, {$push: {likedBy: req.sucess.username},$inc: {likes: 1}}, function(err, succes){
    if (err) {
      console.log(err);
    }else{
                
        db.collection('posts').findOne({_id:ObjectId(req.body._id)}, function(err, succes){      
            if (err) {
                res.send(err);
                console.log(err);
              }
              if(succes) {
              res.send({
                  flag: true,              
                  LikeDetails: succes.likedBy,
                  likes: succes.likes
              }
            );
         
              }
              else{
                  res.send( {
                    flag: false
                  }
                );
                  console.log('failed');
              }
        });

    }      
  });
});

app.post('/whoLike',function(req,res){
    console.log("whoLike");
    console.log(req);
    db.collection('posts').findOne({_id:ObjectId(req.body._id)},function(err,succes){
        if(err){
            res.send(err);
        }else{
            res.send({
            flag: true,
            succes1: succes
            })
            
        }
    });
});


app.post('/registration',function(req,res){
    console.log(req);
    db.collection('users').insert({
        username: req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    },function(err,data){
        if(!err){
            res.send({
                flag: 'Sucessfully added'
            })
        }else{
            res.send({
                flag:'User adding failed'
            })
        }
    })

});



