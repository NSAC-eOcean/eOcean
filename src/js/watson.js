const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

const visualRecognition = new VisualRecognitionV3({
  version: "{version}",
  authenticator: new IamAuthenticator({
    apikey: "{apikey}"
  })
});
