exports.home = (req, res) => {

    res.render("pages/home", {
        title: "Univers du Plaisir"
    });

};


exports.about = (req, res) => {

    res.render("pages/about", {
        title: "À propos"
    });

};


exports.events = (req, res) => {

    res.render("pages/events", {
        title: "Événements"
    });

};


exports.inscription = (req, res) => {

    res.render("pages/inscription", {
        title: "Inscription"
    });

};