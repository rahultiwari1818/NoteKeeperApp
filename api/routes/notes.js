const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();


router.get("/getAllNotes",fetchUser,async(req,res)=>{
    const data = await Notes.find({user:req.user.id});
    return res.status(200).send({"message":"Notes Fetched Successfully.!","data":data,result:true});
})



router.post("/addNote",fetchUser,[
    body("title").trim().isLength({min:3}),
    body("user").exists(),
    body("description").isLength({min:3}).exists(),
    body("tag").isLength({min:3}).exists(),
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({result:false,errors:errors.array()});
    }

    try {

        const {title,description,tag} = req.body;

        const note = new Notes({
            title,description,tag,user:req.user.id,
        })

        const savedNote = await note.save();

        return res.status(200).send({"message":"Note Added Successfully","result":true,"data":savedNote});
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({"message":"Internal Server Error.!"});
    }

})

router.get("/getTags",fetchUser,async(req,res)=>{
    const data = await Notes.distinct("tag");
    return res.status(200).send({"message":"Tags Fetched Successfully.!","result":true,data:data});

})

router.get("/getNotes/:tag/:search?",fetchUser,async(req,res)=>{
    let tag = req.params.tag;
    let search = req.params.search||" ";
    if(tag==="ALL"){
        const data =  await Notes.find({ title: { $regex: search } });
        return res.status(200).send({message:"Notes Fetched Succwssfully",result:true,data:data});

    }
    const data = await Notes.find({$and:[{tag:tag},{ title: { $regex: search } }]});
    return res.status(200).send({message:"Notes Fetched Succwssfully",result:true,data:data});
})

router.patch("/updateNote",fetchUser,[
    body("title").trim().isLength({min:3}),
    body("user").exists(),
    body("description").isLength({min:5}).exists(),
    body("tag").isLength({min:3}).exists(),
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({result:false,errors:errors.array()});
    }

    try {

        const {title,description,tag,_id,user} = req.body;

        const result = Notes.findByIdAndUpdate(_id,);
        const doc = await Notes.findById(_id);
  
        const output = await doc.updateOne({user:user,title:title,description:description,tag:tag})

        if(output.modifiedCount >= 1){

            return res.status(200).send({"message":"Note Updates Successfully","result":true});
        }
        else{
            return res.status(400).send({"message":"Check Your Data.!","result":false});
        }

        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({"message":"Internal Server Error.!"});
    }

})

router.delete("/delete/:id",fetchUser,async(req,res)=>{
    let id = req.params.id;
    const result = await Notes.deleteOne({_id:id});
    if(result){
        return res.status(200).send({"message":"Note Deleted Successfully","result":true});

    }
    else{
        return res.status(400).send({"message":"Check Your Data.!","result":false});

    }
})


module.exports = router;