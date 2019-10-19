const http = require('http')
const fs = require('fs')
const formidable = require('formidable')
const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3")
const { IamAuthenticator } = require("ibm-watson/auth")

const PORT = 9000
const HOST = '127.0.0.1'

http.createServer({}, (request, response) => {
    if (request.url == '/upload') {
        var form = new formidable.IncomingForm()
        form.parse(request, (err, fields, files) => {
            callWatson(fs.createReadStream(files.image.path)).then((watson) => {
                // response.writeHead(200, { 'Content-Type': 'application/json' })
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.end(
                    postMessage(watson)
                    // watson
                )
            }).catch((error) => {
                // response.writeHead(200, { 'Content-Type': 'application/json' })
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.end(
                    postMessage(error)
                    //error
                )
            })
        })
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<form action="upload" method="post" enctype="multipart/form-data">')
        response.write('<input type="file" name="image"><br>')
        response.write('<input type="submit">')
        response.write('</form>')
        return response.end()
    }
}).listen(PORT, HOST)
console.log("Running on " + HOST + " at port " + PORT + ".")

function callWatson(image) {
    return new Promise((resolve, reject) => {
        const visualRecognition = new VisualRecognitionV3({
            version: "2018-03-19",
            authenticator: new IamAuthenticator({
                apikey: "ENjFYlgmnp3YaM_XWkMdfJ4WdgzjdwDp97v2jS8u8e72"
            })
        })
        const classifyParams = {
            imagesFile: image,
            owners: ["me"],
            threshold: 0.6
        };
        visualRecognition
            .classify(classifyParams)
            .then(classifiedImages => {
                resolve(JSON.stringify(classifiedImages, null, 2))
            })
            .catch(error => {
                reject(JSON.stringify({ error: error }))
            })
    })
}

function postMessage(message) {
    return `<!DOCTYPE html><html><head><script>window.parent.postMessage(${message},"*");</script></head><body></body></html>`;
}