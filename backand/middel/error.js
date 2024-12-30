    const ErrorHandler=require('../utels/errorhandeling')


    module.exports=(err,req,res,next)=>{

        err.statusCode= err.statusCode || 500;
        err.message=err.message||"internel servor error";

        err.status( err.statusCode).json({
            success:false,
            error:err,
        })

    }