module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    if (req.session.user.role !== 'member') {
        return res.redirect('/');
    }
    next();
};

