
const path = require('path');
const { readJSON } = require('../utils/jsonDB');
const eventsFile = path.join(__dirname, '../data/events.json');
const profilesFile = path.join(__dirname, '../data/profiles.json');

exports.home = async (req, res) => {
    const profiles = await readJSON(profilesFile);
    res.render('pages/home', {
        title: 'Univers du Plaisir',
        user: req.session.user || null,
        profiles
    });
};

exports.about = (req, res) => {
    res.render("pages/about", {
        title: "À propos",
        user: req.session.user || null
    });
};

exports.inscription = (req, res) => {
    res.render("pages/inscription", {
        title: "Inscription",
        user: req.session.user || null,
        success: false,
        message: ''
    });
};

exports.events = async (req, res) => {
    const events = await readJSON(eventsFile);
    res.render("pages/events", {
        title: "Événements",
        events,
        user: req.session.user || null
    });
};

exports.rencontres = async (req, res) => {
    const profiles = await readJSON(profilesFile);
    res.render('pages/rencontres', {
        title: 'Rencontres',
        profiles,
        user: req.session.user || null
    });
};

