// Dependencies



const express = require('express')
const path = require('path')
const url = require('url')
const Proxy = require('unblocker')
var port = process.env.PORT || 8080
// var http = require('http');
// var url = require('url');
// var request = require('request');

const app = express()
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(301, `https://${req.headers.host}/${req.url}`)
  }

  next();
});

// Templating Configuration
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, '/templates'))
app.set('view engine', 'html')

app.use(new Proxy({prefix: '/proxy/'}));
app.use(new Proxy({prefix: '//proxy/'}));

// Static
app.use(express.static('static'))

// Requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.get('/', (req, res) => {
	res.render('index')
	// res.sendFile(path.join(__dirname, 'pages/index.html'))
    // let now = new Date();
//   console.log("Page Request[/]: "+now);
})

app.get('/session', (req, res) => {
	res.render('session')
	// res.sendFile(path.join(__dirname, 'pages/index.html'))
    // let now = new Date();
//   console.log("Page Request[/]: "+now);
})

//404 Error
app.use((req, res) => {
	res.status(404).render('404')
})
app.use(function(req, res, next) {
    res.status(404);
    res.sendFile(__dirname + '/templates/404.html');
    let now = new Date();
    console.log("404 Error: "+now);
});


app.listen(port, function(){
	console.log("app running on port "+port+"!")
})
''

// var server = http.createServer(function(req, res) {  
//     var path = url.parse(req.url).pathname;  
//     switch (path) {  
//         case '/':  
//             fs.readFile('index.html', function(error, data) {  
//                 if (error) {  
//                     res.writeHead(404);  
//                     res.write(error);  
//                     res.end();  
//                 } else {  
//                     res.writeHead(200, {  
//                         'Content-Type': 'text/html'  
//                     });  
//                     res.write(data);  
//                     res.end('<head><title>Poly Mirror Service</title></head>');  
//                 }  
//             });  
//             break;  
//         case '/proxy':  
// 			fs.readFile('partials/proxy.html', function(error, data) {  
//                 if (error) {  
//                     res.writeHead(404);  
//                     res.write(error);  
//                     res.end();  
//                 } else {  
//                     res.writeHead(200, {  
//                         'Content-Type': 'text/html'  
//                     });  
//                     res.write(data);
// 					res.end('<head><title>Poly Mirror Service</title></head>');  
//                 }  
//             });  
// 			break; 
// 		case '/process':  
// 			try{
// 			res.write('<head><title>Poly Mirror Service</title></head>')
//         	var queryData = url.parse(req.url, true).query;
// 				if (queryData.url) {
// 					console.log('Webpage requested...')
// 					request({
// 						url: queryData.url
// 					}).on('error', function(e) {
// 						res.end(e);
// 					}).pipe(res);
// 				}
// 				else {
// 					res.end("<h1>404 error</h1><p>no url was detected</p><head><title>Poly Mirror Service</title></head>");
// 				}
// 			} catch(e) {
// 				console.log('error');
// 				res.write("<p>redirecting...</p> <script>window.location.replace('https://proxy.lethdev2019.repl.co/404.html');</script>");
// 				res.end();
// 			}
//             break;   
//         default:  
//             res.writeHead(404);  
//             res.write("<p>redirecting...</p> <script>window.location.replace('https://proxy.lethdev2019.repl.co/404.html');</script>");  
//             res.end();  
//             break;  
//     }  
// });  
// function onRequest(req, res) {

//     var queryData = url.parse(req.url, true).query;
//     if (queryData.url) {
//         request({
//             url: queryData.url
//         }).on('error', function(e) {
//             res.end(e);
//         }).pipe(res);
//     }
//     else {
//         res.end("no url found");
//     }
// }
// try{
// 	server.listen(8082);
// } catch {
// 	server.listen(8082);
// }
