const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const app = express()



app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(3000);

app.get('/', (req, res) => {
		res.download('aaa.jpg', err => {
			if (err) {
				res.send({
					code: -1
				})
			}
		})
	}	
)

const dataURLtoFile = function(dataurl, filename) { 
	var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = Buffer.from(arr[1], "base64").toString()
			console.log(bstr)
			n = bstr.length,
			u8arr = new Uint8Array(n);
	while (n--) {
		
			u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

app.post('/file', (req, res) => {
	const a = req.body
	const file = dataURLtoFile(req.body.file, '123.txt')
	console.log(file)
	res.send(file)
})

app.use((err, req, res, next) => {
	res.status(500).send(err.message);
})




// const fArr = fs.readdirSync('./')
// console.log(fArr)
// for (let i = 0; i < fArr.length; i++) {
// 	console.log(fs.statSync('./' + fArr[i]))
// }

