const errorHandler = (err, req, res, next) => {
    const status = 500;
    const msg = err.message || "Something went wrong";
    
    console.log(err)
    res.status(status).send(msg);
}

module.exports = errorHandler;