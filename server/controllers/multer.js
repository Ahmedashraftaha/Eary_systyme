// CRUD operations on DB
//const express = require('express');
//const app = express()
//const route = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer')

const storageForExamRecords = multer.diskStorage({
    filename: function(req, file, cb) {

        cb(null, req.body.qId[req.body.qPlaceOn] + '_' + file.originalname);
    },
    destination: function(req, file, cb) {
        let dir = fs.mkdir(path.join(req.body.identity.ExamFolder, `exam_`, req.body.id, `questions`, `q_`, req.body.qId[req.body.qPlaceOn++], 'audio'));

        cb(null, dir);
    },
});
const filterForExamRecords = (req, file, cb) => {
    const allowedMimeTypes = ['audio/wav', 'audio/mp3'];
    if (!allowedMimeTypes.includes(file.mimetype.toLowerCase()) || file.size > 50) {
        cb(null, false);
    }
    cb(null, true);
}
module.export = {
    audio: multer({ fileFilter: filterForExamRecords, storage: storageForExamRecords })
}