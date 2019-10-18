const http = require("http");
const fs = require("fs");
const { Readable } = require("stream");
// const Request = require("Request");

const server = http.createServer(function(request, response) {
  //   if (request.method == "GET") {
  // console.log("GET");
  // var body = "";
  //   console.log(request.url);
  request.on("data", function(data) {
    // body += data;
    // console.log("Partial body: " + body);
    // console.log(data);
  });
  //get the image through a post request
  request.on("end", function() {
    // var watson;
    // console.log(request.url);

    // var stream = require("stream");

    // // Initiate the source
    // var bufferStream = new stream.PassThrough();

    // // Write your buffer
    // bufferStream.end(base64ToBuffer(request.url.substr(1)));
    // bufferStream.pipe(process.stdout);

    // const image = bufferToStream(bufferStream);

    // var Base64Decode = require("base64-stream").decode;
    var { Base64Decode } = require("base64-stream");
    var stringImage = request.url.substr(1);
    // console.log("hi", Base64Decode);
    var imgFile = new Base64Decode(stringImage);

    // const fs = require("fs");

    ////////////////////////////////////////
    const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
    const { IamAuthenticator } = require("ibm-watson/auth");

    // console.log(VisualRecognitionV3);
    const visualRecognition = new VisualRecognitionV3({
      version: "2018-03-19",
      authenticator: new IamAuthenticator({
        apikey: "ENjFYlgmnp3YaM_XWkMdfJ4WdgzjdwDp97v2jS8u8e72"
      })
    });
    // console.log(imgFile);
    const classifyParams = {
      //imgFile,
      imagesFile: imgFile,
      //   fs.createReadStream(
      //     // request.url.substr(1)
      //     // toArrayBuffer(base64ToBuffer(request.url.substr(1)))
      //   ),
      // fs.createReadStream("../assets/img/test.jpg"),
      owners: ["me"],
      threshold: 0.6
    };

    // console.log("classify", classifyParams);

    visualRecognition
      .classify(classifyParams)
      .then(classifiedImages => {
        // console.log("bl/a ba blalnssdlksd");
        // console.log(watson);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(classifiedImages, null, 2));
      })
      .catch(err => {
        console.log("error:", err);
      });

    // Reques;
    // console.log(Request.get(request.url));
    // console.log(request.url.substr(1));
    // fs.writeFile(
    //   "image.png",
    //   request.url.substr(1),
    //   { encoding: "base64" },
    //   function(err) {
    //     console.log("File created", err);
    //   }
    // );
    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.end(watson); //('<img src="' + request.url.substr(1) + '"/>');
    // response.end("<img src=" + "" + "/>");
  });
  //   }
});

const port = 9000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);

var base64ToBuffer = function(base64) {
  var byteString = new Buffer(base64, "base64").toString("binary");

  var ab = new Buffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return ab;
};

function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });

  return readableInstanceStream;
}

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
