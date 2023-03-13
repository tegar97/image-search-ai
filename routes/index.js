const express = require("express");
const fs = require("fs");
const imagesearch = require("@alicloud/imagesearch20201214");
const oss = require("@alicloud/oss-util");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Mengatur storage engine untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Inisialisasi multer dengan storage engine yang telah diatur
const upload = multer({ storage: storage });

// Route untuk upload file
router.post("/image-classification", upload.single("file"), async (req, res) => {
  try {

     const client = new imagesearch.default({
       accessKeyId: "LTAI5tGziqDojQ4sEJ2T2Dua",
       accessKeySecret: "tqCdqyyx9BnFd5PLKBPJZgsJIf7aiS",
       type: "access_key",
       endpoint: "imagesearch.ap-southeast-1.aliyuncs.com",
       regionId: "ap-southeast-1",
       protocol: "http",
     });
      const { file } = req;
      console.log(`File ${file.originalname} uploaded successfully`);
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      file.filename
    );
    const readStream = fs.createReadStream(filePath);
  
  

    const searchImageByPicAdvanceRequest =
      new imagesearch.SearchImageByPicAdvanceRequest({
        instanceName: "freshmarket",
        picContentObject: readStream,
        categoryId: 8,
      
        
      });
    let ossRuntime = new oss.RuntimeOptions({});
    const searchImageByPicResponse = await client.searchImageByPicAdvance(
      searchImageByPicAdvanceRequest,
      ossRuntime
    );
    return res.json(searchImageByPicResponse);

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }


});

// upload image to aliyun

router.post('/upload', upload.single('file'), async (req, res) => {
  try {

    const client = new imagesearch.default({
      accessKeyId: "LTAI5tGziqDojQ4sEJ2T2Dua",
      accessKeySecret: "tqCdqyyx9BnFd5PLKBPJZgsJIf7aiS",
      type: "access_key",
      endpoint: "imagesearch.ap-southeast-1.aliyuncs.com",
      regionId: "ap-southeast-1",
      protocol: "http",
    });
    const { file } = req;
    console.log(`File ${file.originalname} uploaded successfully`);
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      file.filename
    );
    const readStream = fs.createReadStream(filePath);
  
  
 
      // stop program
    
      
    
      
    const addImageAdvanceRequest = new imagesearch.AddImageAdvanceRequest({
      instanceName: "freshmarket",
      categoryId: 8,
      picContentObject: readStream,
      productId: req.body.product_id,
      picName: req.body.product_name,
    });
    let ossRuntime = new oss.RuntimeOptions({});
    const addResponse = await client.addImageAdvance(
      addImageAdvanceRequest,
      ossRuntime
    );
    return res.json(addResponse);

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});





router.post("/search",upload.single('file') ,async (req, res) => {
  // try {
  const file = req.file;
  console.log(file)

  //convert file to stream
  
  

  // const readStream = fs.createReadStream(file.buffer);

    
  var picContent = fs.ReadStream(file.buffer);
  console.log(picContent)



});

module.exports = router;
