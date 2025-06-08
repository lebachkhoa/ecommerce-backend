// wapper to handle errors in async route handle and forwad them to Express Error middware (define in app.js)
const asyncErrorHandle = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))     // invoke fn, use Promise.resolve ensure both async function and sync function are handled consistently
            .catch(err => next(err));           // forward any error to Express error-handling middleware
    }
}

module.exports = asyncErrorHandle;