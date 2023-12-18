const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const multer = require("multer");
const upload = multer({dest:"uploads/"})
const router = express.Router();
const fs = require("fs");
const Files = require("../models/Files");

router.post("/uploadDoc",fetchUser,upload.single("document"),async(req,res)=>{
    const description = req.body.description || " ";
    const file = req.file;
    console.log(req.body);
    if(!file){
        return res.status(400).send({"message":"Please Select a Document.!",result:false});
    }

    const allowedExtensions = {
        pdf: 'application/pdf',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        doc: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        txt:'plain',
        rtf:'rtf',
    }

    const extension = file.mimetype.split("/")[1];
    
    if(!allowedExtensions[extension]){
        return res.status(400).send({message:"Invalid Document Format.!",result:true});
    }
    
    const current_time = Date.now()

    try {
        // console.log(file.path);


        const originalname = file.originalname;
        const newFilePath = `uploads/${current_time}-${file.originalname}`;
        fs.renameSync(file.path,newFilePath);

        const newRec = new Files({
            user:req.user.id,
            filePath:newFilePath,
            OriginalFileName:originalname,
            extension:extension,
            description:description
        });

        newRec.save();

        return res.status(200).send({"message":"File Uploaded Successfully","result":true});


        
    } catch (error) {
        
        console.error(error.message);
        return res.status(500).send({"message":"Internal Server Error.!"});
    }


})


router.get("/getAllFiles",fetchUser,async(req,res)=>{
    const data = await Files.find({
        user:req.user.id
    });
    return res.status(200).send({message:"Files Fetched Successfully.!",result:true,data:data});
})

module.exports = router;