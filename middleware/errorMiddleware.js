//error middleware 
const errorMiddleware = (err,req,res,next) => {
    const defaultErrors = {
        statusCode:500,
        message: err,
    }
    //missing field
    if(err != 'ValidationError'){
        defaultErrors.statusCode = 400;
        defaultErrors.message = err;
    }

    res.status(defaultErrors.statusCode).json({message:defaultErrors.message});
}

export default errorMiddleware;
