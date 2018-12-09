'use strict'
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt');
let data = ''
const db = new sqlite3.Database('./MyMusicDB.db', (err) => {
	if (err) return console.error(err.message)
	console.log('Connected to the "MyMusicDB.db" SQlite database.')
})
module.exports.create_user = (user, pass, email, callback) => {
    
    let sql = `INSERT INTO users(username, password, email)
    VALUES("${user}", "${pass}", "${email}");`
    db.run(sql, err => {
    if(err){ 
        console.log(err);}
        else{
            return callback(null,true)
        }

    })
}
module.exports.create_album = (UserID, AlbumName, Image, callback) => {
    
    let sql = `INSERT INTO albums(user_id, album_name, album_image)
    VALUES("${UserID}", "${AlbumName}", "${Image}");`
    db.run(sql, err => {
    if(err){ 
        console.log(err);}
        else{
            return callback(null,true)
        }

    })
}
module.exports.add_song = (albumID, Song_Name,Artist, Song,userID, callback) => {
    
    let sql = `INSERT INTO songs(album_id,user_id, artist, song_name, song)
    VALUES("${albumID}","${userID}", "${Artist}", "${Song_Name}", "${Song}");`
    db.run(sql, err => {
    if(err){ 
        console.log(err);
        return callback(null,false);}
        else{
            return callback(null,true)
        }

    })
}

module.exports.Reset_Password = (email,user,callback) => {
    var Password = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
    {
        Password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    let sql = `UPDATE users SET password = "${Password}" WHERE email = "${email}";`
    db.run(sql, err => {
    if(err){console.log(err);
        return callback(null,false);}
        else{
            const Data = {
                Res: true,
                Pass: Password,
                Username: user
            }
            return callback(null,Data)
        }

    })
}

module.exports.Update_Password = (User_Name,new_password,callback) => {
    let sql = `UPDATE users SET password = "${new_password}" WHERE username = "${User_Name}";`
    db.run(sql, err => {
    if(err){console.log(err);
        return callback(null,false);}
        else{
            return callback(null,true)
        }

    })
}

module.exports.Password_Validation = (user, pass, callback) => {
let sql = ''
	if(pass != '' && user != '') {
		sql = `SELECT * FROM users WHERE username = ? AND password = ?;`
	}
	db.all(sql,[user,pass], (err, row) => {
        if(err) {console.error(err.message);
            return callback(null,false);}
        if (row.length >= 1) {
            // success
            return callback(null, true)
        } else {
            //  not found
            return callback(null, false)
        } 
    })
}

module.exports.GetAlbums = (id,callback) => {
    let sql = ''
            sql = `SELECT * FROM albums WHERE user_id = ?;`
        db.all(sql,[id], (err, result) => {
            if(err)  {
                console.error(err.message)
                return callback(null, false)
            }
            else{
                
                
                return callback(null, result)
            } 
        })
    }
    

    module.exports.GetAlbumSongs = (id,callback) => {
        let sql = ''
                sql = `SELECT * FROM songs WHERE album_id = ?;`
            db.all(sql,[id], (err, result) => {
                if(err)  {
                    console.error(err.message)
                    return callback(null, false)
                }
                else{
                    
                    
                    return callback(null, result)
                } 
            })
        }

module.exports.check_username = (user, callback) => {
    let sql = ''
    
            sql = `SELECT * FROM users WHERE username = ?;`
        db.all(sql,[user], (err, row) => {
            if(err) {
                console.error(err.message);
                return callback(null,false);
            }
            console.log(row)
            if (row.length >= 1) {
                
                return callback(null, true)}
                else{
                    return callback(null, false)
                }
        })
    }
    module.exports.check_email = (email, callback) => {
        let sql = ''
        
                sql = `SELECT * FROM users WHERE email = ?;`
            db.all(sql,[email], (err, row) => {
                if(err) {console.error(err.message);
                    return callback(null,false);}
                if (row.length >= 1) {
                    // success
                    return callback(null, true)
                }
                else{
                    return callback(null, false)
                } 
            })
        }
        module.exports.GetID = (user, callback) => {
            let sql = ''
                    sql = `SELECT * FROM users WHERE username = ?;`
                db.get(sql,[user], (err, result) => {
                    if(err)console.error(err.message)
                        const Data = {
                            Res: true,
                            ID: result.id
                        }
                        return callback(null, Data);
                   
                })
            }

            module.exports.GetUsername = (email, callback) => {
                let sql = ''
                        sql = `SELECT * FROM users WHERE email = ?;`
                    db.get(sql,[email], (err, result) => {
                        if(err)console.error(err.message)
                            return callback(null, result.username);
                       
                    })
                }
                module.exports.DeleteAlbum = (ID,callback) => {
                let sql = `DELETE FROM albums WHERE id = "${ID}";`
                    db.run(sql, err => {
                    if(err){console.log(err); 
                        return callback(null,false)
                    }
                        else{
                            return callback(null,true)
                        }
                
                    })
                }
                module.exports.DeleteUser = (ID,callback) => {
                    let sql = `DELETE FROM users WHERE id = "${ID}";`
                        db.run(sql, err => {
                        if(err){console.log(err); 
                            return callback(null,false)
                        }
                            else{
                                return callback(null,true)
                            }
                    
                        })
                    }

                    module.exports.DeleteAlbums = (ID,callback) => {
                        let sql = `DELETE FROM albums WHERE user_id = "${ID}";`
                            db.run(sql, err => {
                            if(err){console.log(err); 
                                return callback(null,false)
                            }
                                else{
                                    return callback(null,true)
                                }
                        
                            })
                        }
                        module.exports.DeleteSongs = (ID,callback) => {
                            let sql = `DELETE FROM songs WHERE user_id = "${ID}";`
                                db.run(sql, err => {
                                if(err){console.log(err); 
                                    return callback(null,false)
                                }
                                    else{
                                        return callback(null,true)
                                    }
                            
                                })
                            }
                