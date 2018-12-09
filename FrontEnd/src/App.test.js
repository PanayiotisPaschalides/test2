const faker = require('faker')
const puppeteer = require('puppeteer')
var path = require('path');

const User = {
	username: faker.name.firstName() + faker.name.lastName(),
	email: faker.internet.email(),
	password: faker.random.alphaNumeric(6),
}

let page
let browser
const width = 1920
const height = 1080

beforeAll( async() => {
	browser = await puppeteer.launch({
		headless: true,
		slowMo: 40,
		args: [`--window-size=${width},${height}`, '--disable-http2']
	})
	page = await browser.newPage()
	await page.setViewport({ width, height })
})


  describe('Testing Functionallity', () => {

    test('Register Account', async done => {
        await page.waitFor(1000)
        await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
		var title = await page.title()
        expect(title).toBe('Login')
        await page.click('a[name=Register]')
        await page.screenshot({ path: 'screenshots/Register_Load.png' })
        title = await page.title()
        expect(title).toBe('register')
        await page.click('input[name=username]')
        await page.type('input[name=username]', User.username)
        await page.click('input[name=email]')
        await page.type('input[name=email]', User.email)
        await page.click('input[name=password]')
        await page.type('input[name=password]', User.password)
        await page.click('input[name=confirmpassword]')
        await page.type('input[name=confirmpassword]', User.password)
        await page.screenshot({ path: 'screenshots/Register_Filled_Form.png' })
        await page.click('input[type=submit]')
        title = await page.title()
        expect(title).toBe('Login')
		
		done();
	}, 16000)
	test('Checking user login', async done => {

        await page.screenshot({ path: 'screenshots/Login_Loaded.png' })
		var title = await page.title()
        expect(title).toBe('Login')
        await page.click('input[name=username]')
        await page.type('input[name=username]', User.username)
        await page.click('input[name=password]')
        await page.type('input[name=password]', User.password)
        await page.click('button[type=submit]')
        await page.screenshot({ path: 'screenshots/Main_Page.png' })
        title = await page.title()
        expect(title).toBe('MyMusic')
		done();
    }, 16000)



    test('add album click', async done => {
		var title = await page.title()
        expect(title).toBe('MyMusic')
        await page.click('div[class=Add-Album-Btn-Circle]')
        await page.screenshot({ path: 'screenshots/Album_Open.png' })
		done();
    }, 16000)
    test('upload album', async done => {
        const filePath = path.relative(process.cwd(), __dirname + '/imgs/local/avatar.png');
        await page.click('img[class=Preview-Album-Img]')
        const input = await page.$('input[type=file]');
        await input.uploadFile(filePath);
        await page.click('input[class=AlbumNameField]')
        await page.type('input[class=AlbumNameField]', 'test')
        await page.click('button[id=upload]')
        await page.waitFor(1000)
        await page.screenshot({ path: 'screenshots/Upload_Album.png' })
		done();
    }, 16000)
    test('add song click', async done => {
		var title = await page.title()
        expect(title).toBe('MyMusic')
        await page.click('div[class=Add-Btn-Circle]')
        await page.screenshot({ path: 'screenshots/Song_Open.png' })
		done();
    }, 16000)
    test('song upload', async done => {
        const filePath = path.relative(process.cwd(), __dirname + '/imgs/local/Song1.mp3');
        await page.click('button[class=Select-Song]')
        const input = await page.$('input[type=file]');
        await input.uploadFile(filePath);
        await page.click('input[class=SongNameField]')
        await page.type('input[class=SongNameField]', 'Song')
        await page.click('input[class=SongArtistField]')
        await page.type('input[class=SongArtistField]', 'Artist')
        await page.waitFor(1000)
        await page.screenshot({ path: 'screenshots/Upload_Song.png' })
        await page.click('button[id=upload]')
		done();
    }, 16000)
    test('Play album', async done => {
        await page.click('div[class=Play-Btn-Circle]')
        await page.waitFor(10000)
        await page.click('div[class=Play-Btn-Circle]')
        await page.waitFor(10000)
        const element = await page.$('label[class=title]');
        const text = await (await element.getProperty('textContent')).jsonValue();
        expect(text).toBe('Artist - Song')
        await page.screenshot({ path: 'screenshots/Play_Album.png' })
		done();
    }, 30000)
    test('delete album click', async done => {
		var title = await page.title()
        expect(title).toBe('MyMusic')
        await page.click('div[class=Trash-Btn-Circle]')
        await page.waitFor(10000)
        await page.screenshot({ path: 'screenshots/Delete_Album.png' })
		done();
    }, 16000)
    test('Checking logout click', async done => {
        await page.waitFor(1000)
		var title = await page.title()
        expect(title).toBe('MyMusic')
        await page.click('button[id=dropdown-size-small]')
        await page.click('a[name=logout]')
        await page.screenshot({ path: 'screenshots/Logout.png' })
        title = await page.title()
        expect(title).toBe('Login')
        await browser.close()
		done();
    }, 16000)
    
})