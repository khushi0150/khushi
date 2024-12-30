// const User = require('../models/usermodel');
// // const bcrypt = require('bcryptjs');
// // const ErrorHandler = require('../utels/errorhandeling'); // Ensure this file exists

// // Register user function


// exports.registerUser =async (req, res) => {
// // console.log(req.body) 
//     try {
        
//         const {name} = req.body
//       const userChecks = await regmodel.findOne({Name:name})
//        console.log(userChecks)
//        if(userChecks == null ){
//       const record = new regmodel({
//         Name:name,
       

//         })
//         await record.save()
//         console.log(record)
//         res.json({
//             message:"sucessfully registred",
//             statuscode:281,
//             data:record
//         })
//     } 

//      else{
//         res.json({
//             message:"name is already registered",
//             statuscode:404,
//             data:null
//         })
//     }
//     } catch (error) {
//         res.json({


//             message:` page not found /error in register api $(error)`,
//             statuscode: 404,
//             data: null,
//         })

//     }
// }
// exports.findreg = async(req,res)=>{
//     try{
//     const record = await regmodel.find()
//     res.json({
//         message:"register user found", 
//         data:record
//     })

// }
//    catch(error){
//     res.json({
//         message:"user not found",
//         data:null
//     })
//    }
// }
// exports.deletereg =async(req,res)=>{
//     try{
//       const id =req.params.id
//       const record=await regmodel.findByIdAndDelete(id)
//       res.send({
//         message:"data is deleted",
//         data:record
//       })

//     }catch(error){
//         res.send({
//             message:"data not deleted",
//             data:record 
//           })
//     }
// }

// exports.update =async(req,res)=>{
//     // console.log(req.params.id)
//     // console.log(req.body)
//     const {name } = req.body
//     const id =req.params.id

//    const record = await regmodel.findByIdAndUpdate(id ,{
//     Name:name,
    
//     })
//     res.send({
//         message:"data is updated",
//         data:record
//     })
   
// }
// exports.findUpdateuser =async(req,res)=>{
//     const id =req.params.id
//    const record = await regmodel.findById(id);
//    res.json(record)
// }