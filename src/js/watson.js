const fs = require("fs");

////////////////////////////////////////
const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

const visualRecognition = new VisualRecognitionV3({
  version: "2018-03-19",
  authenticator: new IamAuthenticator({
    apikey: "ENjFYlgmnp3YaM_XWkMdfJ4WdgzjdwDp97v2jS8u8e72"
  })
});

const classifyParams = {
  imagesFile: fs.createReadStream("../assets/img/icon.png"),
  owners: ["me"],
  threshold: 0.6
};

console.log("classify", classifyParams);

visualRecognition
  .classify(classifyParams)
  .then(classifiedImages => {
    console.log(JSON.stringify(classifiedImages, null, 2));
  })
  .catch(err => {
    console.log("error:", err);
  });
