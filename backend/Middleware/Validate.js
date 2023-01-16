exports.validate = (schema) => {
    return async function (req, res, next) {
        try {
            const validated = await schema.validateAsync(req.body);
            req.body = validated;
            next();
        }
        catch (err) {
            console.log(err.message);
            return res.json({message:err.message})
        }
    }
}