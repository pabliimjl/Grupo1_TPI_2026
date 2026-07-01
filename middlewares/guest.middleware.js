module.exports = (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        return next();
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET);

        return res.redirect("/admin");

    } catch (error) {

        return next();

    }

};