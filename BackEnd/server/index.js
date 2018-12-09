const express = require('express');
const bodyParser = require('body-parser');
const datalayer = require('./modules/DataLayer')
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
const fileManager = require('fs');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.post('/api/Delete', (req, res) => {

  const filePath = '../../FrontEnd/public/Uploaded_Images/' + req.body.UserName + '/' + req.body.Album_Img; 
  fileManager.unlinkSync(filePath);
  datalayer.DeleteAlbum(req.body.ID, 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});

app.post('/api/DeleteUser', (req, res) => {
  const ID = req.body.ID;
  if (!fileManager.existsSync('../../FrontEnd/public/Uploaded_Images/' + req.body.UserName)){
    const filePath = '../../FrontEnd/public/Uploaded_Images/' + req.body.UserName; 
  fileManager.unlinkSync(filePath);
}

if (!fileManager.existsSync('../../FrontEnd/public/Uploaded_Songs/' + req.body.UserName)){
  const filePath = '../../FrontEnd/public/Uploaded_Songs/' + req.body.UserName; 
fileManager.unlinkSync(filePath);
}

  datalayer.DeleteUser(ID, 
    (err,result) => { //gets the result from the callback
      res.send(result);
      if(result){
        datalayer.DeleteAlbums(ID, 
          (err,result) => { //gets the result from the callback
            res.send(result);
            if(result){
              datalayer.DeleteSongs(ID, 
                (err,result) => { //gets the result from the callback
                  res.send(result);
                  if(result){
                    res.send({status: true});
                  }
              })
            }
        })
      }
	})
});


app.get('/api/GetAlbums', (req, res) => {
  datalayer.GetAlbums(req.query.ID, 
    (err,result) => { //gets the result from the callback
      
      res.send(result);
	})
});

app.get('/api/GetAlbumSongs', (req, res) => {
  datalayer.GetAlbumSongs(req.query.ID, 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});

app.post('/api/upload', function(req, res) {
  console.log(req.body)
  //console.log(req.body.ID);
  //const UserID = req.headers.cookie.split(';')[0].split('=')[1];
  const UserID = req.body.ID;
  const UserName = req.body.UserName;
  let uploadFile = req.files.file;
  const ext = uploadFile.mimetype.split('/')[1];
  const RemoveSpaces = req.files.file.name.replace(/ /g, "-");
  const fileName = RemoveSpaces + '-' + Date.now() + '.' + ext;
  const AlbumName = req.files.file.name;
  if (!fileManager.existsSync('../../FrontEnd/public/Uploaded_Images/' + UserName)){
    fileManager.mkdirSync('../../FrontEnd/public/Uploaded_Images/' + UserName);
}
  uploadFile.mv('../../FrontEnd/public/Uploaded_Images/' + UserName + '/' + fileName, function(err) {
    if (err)
    {
      return res.status(500).send(err);
    }else
    {
      
      datalayer.create_album(UserID,AlbumName, fileName,
        (err,result) => { //gets the result from the callback
         if(result == true)
         {
           
          res.send({status: result})
         }
         else{
           res.send({status: result})
         }
      })
    }
  });
});

app.post('/api/uploadSong', function(req, res) {
  console.log(req.files);
  //console.log(req.body.ID);
  //const UserID = req.headers.cookie.split(';')[0].split('=')[1];
  const SongName = req.body.SongName;
  const Artist = req.body.Artist;
  const Album_ID = req.body.ID;
  const UserName = req.body.UserName;
  const User_ID = req.body.UserID;
  let uploadFile = req.files.file;
  const ext = uploadFile.mimetype.split('/')[1];
  const SongTitle = Artist + '-' + SongName
  const RemoveSpaces = SongTitle.replace(/ /g, "-");
  const fileName = RemoveSpaces + '-' + Date.now() + '.' + ext;

  if (!fileManager.existsSync('../../FrontEnd/public/Uploaded_Songs/' + UserName)){
    fileManager.mkdirSync('../../FrontEnd/public/Uploaded_Songs/' + UserName);
    
}
if (!fileManager.existsSync('../../FrontEnd/public/Uploaded_Songs/' + UserName + '/' + Album_ID)){
  fileManager.mkdirSync('../../FrontEnd/public/Uploaded_Songs/' + UserName + '/' + Album_ID)
}
  uploadFile.mv('../../FrontEnd/public/Uploaded_Songs/' + UserName + '/' + Album_ID + '/' + fileName, function(err) {
    if (err)
    {
      res.send({status: false})
    }else
    {
      
      datalayer.add_song(Album_ID,SongName,Artist,fileName,User_ID,
        (err,result) => { //gets the result from the callback
         if(result == true)
         {
           
          res.send({status: result})
         }
         else{
           res.send({status: result})
         }
      })
    }
  });
  
});


app.post('/api/create-user', (req, res) => {
  var user = req.body.username;
  var mail = req.body.email;
  var pass = req.body.password;
  console.log(mail);
  datalayer.check_username(user, 
    (err,result) => { //gets the result from the callback
     if(result == false)
     {
      datalayer.check_email(mail, 
        (err,result) => { //gets the result from the callback
         if(result == false)
         {
          datalayer.create_user(user, pass, mail,
            (err,result) => { //gets the result from the callback
             if(result == true)
             {
              res.send({status: 2})
             }
             else{
               res.send({status: 3})
             }
          })
         }
         else{
           res.send({status: 1})
         }
      })

     }
     else{
       res.send({status: 0})
     }
	})
});

 

app.get('/api/reset-password', (req, res) => {
  datalayer.check_email(req.query.email, 
    (err,result) => { //gets the result from the callback
     if(result == true)
     {
      datalayer.GetUsername(req.query.email, 
        (err,result) => { //gets the result from the callback
          datalayer.Reset_Password(req.query.email, result,
            (err,result) => { //gets the result from the callback
              if(result.Res == true)
                     {
                      var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'MyMusicApp.NoReply@gmail.com',
                          pass: '6L!zz!e7'
                        }
                      });
                      
                      var mailOptions = {
                        from: 'MyMusicApp.NoReply@gmail.com',
                        to: req.query.email,
                        subject: 'MyMusic App you have reset your password',
                        html: '<font size="4">Dear, ' + result.Username +'</br>your new password is: <b>' + result.Pass + '</b></font>'
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          res.send({status: false});
                        } else {
                          res.send({status: true});
                        }
                      });
        
                      
                     }
                     else{
                      res.send({status: false});
                     }
            
          })
      })

     }
     else{
       res.send({status: 0})
     }
	})
    
});
app.get('/api/LoginValidation', (req, res) => {

   
  datalayer.Password_Validation(req.query.username,req.query.password, 
    (err,result) => { //gets the result from the callback
      if(result)
      {
      datalayer.GetID(req.query.username, 
        (err,result) => { //gets the result from the callback
          res.send({status: result.Res, ID: result.ID });
      })
    }
    
  })
});
app.listen(port, () => console.log(`Listening on port ${port}`));