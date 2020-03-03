var express = require('express');
var router = express.Router();
const multer = require('multer');
var fs = require('fs');
var path = require('path');

let upload = multer({
  storage: multer.diskStorage({
      //设置文件存储位置
      destination: function (req, file, cb) {
          let dir = "/www/wwwroot/attachments/" + "TemplateId" + req.headers.template_id + "/SkinId" + req.headers.itemId

          //判断目录是否存在，没有则创建
          if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, {recursive: true});
          }

          //dir就是上传文件存放的目录
          cb(null, dir);
      },
      //设置文件名称
      filename: function (req, file, cb) {
          let fileName =  Date.now() + path.extname(file.originalname);
          //fileName就是上传文件的文件名
          cb(null, fileName);
      }
  })
});

function getRes(){
  let content = fs.readFileSync("./config/resources.json")
  return content;
};

router.post('/uploadSingle', upload.single('ResConfig'), function (req, res) {
  let config = getRes();
  console.log("上传成功！")
  res.end('ok');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("获取ResList")
  res.json(getRes());
});


module.exports = router;
