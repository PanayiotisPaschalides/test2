'use strict'
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt');
let data = ''
const db = new sqlite3.Database('./database.db', (err) => {
	if (err) return console.error(err.message)
	console.log('Connected to the "database.db" SQlite database.')
})
module.exports.GetAdverts = (callback) => {
    let sql = ''
            sql = `SELECT * FROM adverts;`
        db.all(sql, (err, result) => {
            if(err)  {
                console.error(err.message)
                return callback(null, false)
            }
            else{
                
                
                return callback(null, result)
            } 
        })
    }

    module.exports.GetRating = (User,callback) => {
        console.log(User)
            let sql = `SELECT rating FROM ratings WHERE to_user='${User}';`
            db.all(sql, (err, result) => {
                    
                    const Data = {
                        People : result.length,
                        Rates : result
                    }
                    return callback(null, Data)
                
               
            })
        }
    module.exports.LoadChatItems = (username,callback) => {
        let sql = ''
                sql = `SELECT * FROM chats WHERE by_user="${username}" OR to_user="${username}" ORDER BY time_stamp DESC;`
            db.all(sql, (err, result) => {
                if(err)  {
                    console.error(err.message)
                    return callback(null, false)
                }
                else{
                    
                    
                    return callback(null, result)
                } 
            })
        }

        module.exports.LoadMessages = (ID,callback) => {
            let sql = ''
                    sql = `SELECT * FROM messages WHERE chat_id="${ID}" ORDER BY id DESC;`
                db.all(sql, (err, result) => {
                    if(err)  {
                        console.error(err.message)
                        return callback(null, false)
                    }
                    else{
                        
                        
                        return callback(null, result)
                    } 
                })
            }

            module.exports.SendMsg = (ID, By,To,Message,callback) => {
    
                let sql = `INSERT INTO messages(chat_id,by_user,to_user, message, read)
                VALUES("${ID}","${By}","${To}", "${Message}", "no");`
                db.run(sql, err => {
                if(err){ 
                    console.log(err);
                    return callback(null,false);}
                    else{
                        return callback(null,true)
                    }
            
                })
            }
            module.exports.ReadMsg = (Username,ID,callback) => {
                
                let sql = `UPDATE messages SET read="yes" WHERE (to_user="${Username}" AND chat_id="${ID}");`
                db.run(sql, err => {
                if(err){ 
                    console.log(err);
                    return callback(null,false);}
                    else{
                        
                        return callback(null,true)
                    }
            
                })
            }
            module.exports.UpdateStatus = (User,Status,ID,callback) => {
                
                let sql = `UPDATE chats SET ${User}="${Status}" WHERE id="${ID}";`
                db.run(sql, err => {
                if(err){ 
                    console.log(err);
                    return callback(null,false);}
                    else{
                        return callback(null,true)
                    }
            
                })
            }
            module.exports.UpdateChat = (ID,Username,Msg,callback) => {
                const datetime = Date.now();
                let sql = `UPDATE chats SET last_sender="${Username}", last_msg="${Msg}", time_stamp="${datetime}" WHERE id="${ID}";`
                db.run(sql, err => {
                if(err){ 
                    console.log(err);
                    return callback(null,false);}
                    else{
                        return callback(null,true)
                    }
            
                })
            }
            module.exports.TestImage = (callback) => {
                let sql = ''
                        sql = `SELECT * FROM pictures;`
                    db.all(sql, (err, result) => {
                        if(err)  {
                            console.error(err.message)
                            return callback(null, false)
                        }
                        else{
                            if(result.length >= 1){
                                return callback(null, result)
                            }
                            else{
                                return callback(null, false)
                            }
                            
                            
                        } 
                    })
                }
            module.exports.New_Messages_Check = (UserName,callback) => {
                let sql = ''
                        sql = `SELECT * FROM messages WHERE to_user="${UserName}" AND read="no";`
                    db.all(sql, (err, result) => {
                        if(err)  {
                            console.error(err.message)
                            return callback(null, false)
                        }
                        else{
                            if(result.length >= 1){
                                return callback(null, true)
                            }
                            else{
                                return callback(null, false)
                            }
                            
                            
                        } 
                    })
                }
                module.exports.CheckRead = (ID,UserName,callback) => {
                    console.log('im running')
                    let sql = ''
                            sql = `SELECT * FROM messages WHERE chat_id="${ID}" AND to_user="${UserName}" AND read="no";`
                        db.all(sql, (err, result) => {
                            if(err)  {
                                console.error(err.message)
                                return callback(null, false)
                            }
                            else{
                                if(result.length >= 1){
                                    
                                    return callback(null, true)
                                }
                                else{
                                    return callback(null, false)
                                }
                                
                                
                            } 
                        })
                    }
    module.exports.GetRecipe = (ID,callback) => {
        let sql = ''
                sql = `SELECT * FROM recipes WHERE id='${ID}';`
            db.all(sql, (err, result) => {
                if(err)  {
                    console.error(err.message)
                    return callback(null, false)
                }
                else{
                    
                    
                    return callback(null, result)
                } 
            })
        }

    module.exports.GetRecipesManagment = (ID,callback) => {
        let sql = ''
                sql = `SELECT * FROM recipes WHERE user_id='${ID}';`
            db.all(sql, (err, result) => {
                if(err)  {
                    console.error(err.message)
                    return callback(null, false)
                }
                else{
                    
                    
                    return callback(null, result)
                } 
            })
        }

    module.exports.Login = (Username,Password,callback) => {
        let sql = ''
                sql = `SELECT * FROM users WHERE username='${Username}' AND password='${Password}';`
            db.all(sql, (err, result) => {
                if(err)  {
                    console.error(err.message)
                    return callback(null, false)
                }
                if(result.length >= 1)
                {
                    return callback(null, true)
                }
                else{
                    return callback(null, false)
                } 
            })
        }

        module.exports.Register = (Username, Password, Email, callback) => {
    
            let sql = `INSERT INTO users(username, password, email)
            VALUES("${Username}", "${Password}", "${Email}");`
            db.run(sql, err => {
            if(err){ 
                console.log(err);}
                else{
                    return callback(null,true)
                }
        
            })
        }
        module.exports.UpdateRecipeStatus = (ID, Status, callback) => {
    
            let sql = `UPDATE recipes SET status= '${Status}' WHERE id='${ID}';`
            db.run(sql, err => {
            if(err){ 
                console.log(err);}
                else{
                    return callback(null,true)
                }
        
            })
        }
        module.exports.UpdateRecipeViews = (ID, callback) => {
    
            let sql = `UPDATE recipes SET views= views + 1 WHERE id='${ID}';`
            db.run(sql, err => {
            if(err){ 
                console.log(err);}
                else{
                    return callback(null,true)
                }
        
            })
        }

        module.exports.GetID = (Username, callback) => {
            let sql = ''
                    sql = `SELECT * FROM users WHERE username = '${Username}';`
                db.get(sql, (err, result) => {
                    if(err)console.error(err.message)
                        const response = {
                            status: true,
                            ID: result.id
                        }
                        return callback(null, response);
                   
                })
            }

