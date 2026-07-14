const path = require('path');
const { readJSON } = require('../utils/jsonDB');
const eventsFile = path.join(__dirname, '../data/events.json');

exports.dashboard = async (req, res) => {
    const events = await readJSON(eventsFile);
    res.render("member/dashboard", {
        title: "Tableau de bord",
        user: req.session.user,
        events
    });
};

exports.profile = (req, res) => {
    res.render("member/profile", {
        title: "Mon profil",
        user: req.session.user
    });
};

exports.events = async (req, res) => {
    const events = await readJSON(eventsFile);
    res.render("member/events", {
        title: "Mes événements",
        user: req.session.user,
        events
    });
};

exports.pass = (req, res) => {
    res.render("member/pass", {
        title: "Mon pass",
        user: req.session.user
    });
};