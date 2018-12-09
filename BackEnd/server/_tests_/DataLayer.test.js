const datalayer = require('../modules/DataLayer')

describe('add functions', () => {
    
     test('testing adding a new user', () =>{
        datalayer.create_user('test', 'test123', 'test@hotmail.com',
            (err,result) => { 
                expect.assertions(1);
             expect(result).toBe(true);
          })
    })
    test('testing adding a new album', () => {
        datalayer.create_album('100','TestAlbum','Test.png', (err,result)=> {
            expect.assertions(1);
            expect(result).toBe(true);
        })
    })
    test('testing adding a new song', () => {
        datalayer.add_song('100','TestSong','TestArtist','Test.mp3','100', (err,result)=> {
            expect.assertions(1);
            expect(result).toBe(true);
        })
    })


})
describe('check doubles', () => {
    
    test('check username', () =>{
       datalayer.check_username('test',
           (err,result) => { 
            expect.assertions(1);
            expect(result).toBe(true);
         })
   })
   test('check email', () =>{
    datalayer.check_email('test@hotmail.com',
        (err,result) => { 
            expect.assertions(1);
         expect(result).toBe(true);
      })
})
})
describe('Getting Data', () => {
    
    test('testing retrieving ID', () =>{
       datalayer.GetID('test',
           (err,result) => { 
               expect.assertions(2);
            expect(result.Res).toBe(true);
            expect(result.ID).not.toBeNull();
         })
   })
   
   test('testing retrieving albums', () =>{
    datalayer.GetAlbums('100',
        (err,result) => { 
            expect.assertions(1);
         expect(result.length).toBeGreaterThan(0);
      })
})

test('testing retrieving songs', () =>{
    datalayer.GetAlbumSongs('100',
        (err,result) => { 
            expect.assertions(1);
         expect(result.length).toBeGreaterThan(0);
      })
})
test('testing retrieving username from email', () =>{
    datalayer.GetUsername('test@hotmail.com',
        (err,result) => { 
            expect.assertions(1);
         expect(result).toBe('test');
      })
})

})
describe('updating methods', () => {
    
    test('check password reset', () =>{
       datalayer.Reset_Password('test@hotmail.com','test',
           (err,result) => { 
            expect.assertions(4);
            expect(result.Res).toBe(true);
            expect(result.Username).toBe('test');
            expect(result.Pass).toHaveLength(5);
            expect(result.Pass).not.toBeNull();
         })
   })
   test('check password update', () =>{
    datalayer.Update_Password('test','test1234',
        (err,result) => { 
         expect.assertions(1);
         expect(result).toBe(true);
         if(result){
            setTimeout(function(){ 
            datalayer.Password_Validation('test','test1234',
            (err,result) => { 
             expect.assertions(1);
             expect(result).toBe(true);
            }) 
        }, 9.1);
            
         }
        
      })
})
})