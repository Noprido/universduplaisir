exports.dashboard = (req, res) => {

    res.render("member/dashboard", {
        title: "Tableau de bord"
    });

};



exports.profile = (req, res) => {

    res.render("member/profile", {
        title: "Mon profil"
    });

};



exports.events = (req, res) => {

    res.render("member/events", {
        title: "Mes événements"
    });

};



exports.pass = (req, res) => {

    res.render("member/pass", {
        title: "Mon pass"
    });

};