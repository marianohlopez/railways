const invalidUrl = (req, res, next) => {
    res.render("routing-error");
    next();
};

export default invalidUrl;