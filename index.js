// require 
var express 	= require('express');
var mongoose 	= require('mongoose');
var bodyParser = require('body-parser');
var contact    = require('./models/contact');
var login      = require('./models/login');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));



var db = "mongodb://localhost:27017/contactSample";

mongoose.connect(db,function(err,response){
   if(err)
   {
   	 console.log('Failed to connect '+db);
   }
   else
   {
   	 console.log('connected successfully '+db);
   }
})

var router = express.Router();

// GET

router.get('/api/contacts',function(request,response){
  contact.find({},function(err,contacts){
    if(err)
    {
      response.status(404).send(err);
    }
    else
    {
      response.status(200).send(contacts);
    }

  })
});

// POST

router.post('/api/contacts',function(request,response){

  contact.create({'name':request.body.name,'mobile':request.body.mobile},function(err,cont){
      if(err)
      {
         response.status(500).send(err);
      }
      else
      {
        response.status(201).send(cont);
      }
  });

});

// DELETE

router.delete('/api/contacts/:id',function(request,response){
  contact.remove({'_id':request.params.id},function(err,cont){
    if(err)
    {
      response.status(404).send(err);
    }
    else
    {
      response.status(200).send(cont);
    }
  });
  
})

// UPDATE (PUT)
router.put('/api/contacts',function(request,response){
  var id = request.body._id;
  contact.findById(id,function(err,contac){
    if(err)
    {
      response.status(404).send(err);
    }
    contac.update(request.body,function(err,cont){
      if(err)
      {
        response.status(404).send(err);
      }
      else
      {
        response.status(200).send(cont);
      }
    })
  })
})

router.post('/api/login',function(request,response){
    var email = request.body.email;
    var pwd   = request.body.password;

    login.findOne({ 'email': email,'password':pwd }, '', function (err, result) {
       if (err)
       {
          console.log("ERROR==",err);  
          return handleError(err);
       }
       else
       {
          response.status(200).send(result);
       }
    })
    
})

router.post('/api/register',function(request,response){
    var email = request.body.email;
    var pwd   = request.body.password;

    login.create({'email':email,'password':pwd},function(err,res){
      if(err)
        {
          response.status(500).send(err);
        }
        else
        {
          response.status(201).send(res);
        }
    })
})

app.use(express.static(__dirname+'/public'));

app.use('/',router);

app.listen(4000,function(){
	console.log("Server started on port 4000");
})
