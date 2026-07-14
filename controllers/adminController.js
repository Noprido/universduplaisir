const path = require('path');
const bcrypt = require('bcryptjs');
const { readJSON, writeJSON } = require('../utils/jsonDB');

const usersFile = path.join(__dirname, '../data/users.json');
const eventsFile = path.join(__dirname, '../data/events.json');

// Génère un mot de passe aléatoire
function generatePassword(length = 10) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789#@!';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

exports.dashboard = async (req, res) => {
    const users = await readJSON(usersFile);
    const pending = users.filter(u => u.status === 'pending');
    const active = users.filter(u => u.status === 'active');
    const rejected = users.filter(u => u.status === 'rejected');
    res.render("admin/dashboard", {
        title: "Administration",
        pending,
        active,
        rejected,
        admin: req.session.user,
        user: req.session.user || null,
    });
};

exports.validateMember = async (req, res) => {
    const users = await readJSON(usersFile);
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.redirect('/admin');

    const plainPassword = generatePassword();
    const hashed = await bcrypt.hash(plainPassword, 10);

    users[index].status = 'active';
    users[index].password = hashed;
    users[index].validatedAt = new Date().toISOString();
    users[index].subscription.active = true;

    await writeJSON(usersFile, users);

    // Log en console en attendant l'email
    console.log(`✅ Membre validé : ${users[index].email} | Mot de passe : ${plainPassword}`);

    res.redirect('/admin');
};

exports.rejectMember = async (req, res) => {
    const users = await readJSON(usersFile);
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.redirect('/admin');

    users[index].status = 'rejected';
    await writeJSON(usersFile, users);

    res.redirect('/admin');
};

exports.events = async (req, res) => {
    const events = await readJSON(eventsFile);
    res.render("admin/events", {
        title: "Gestion des événements",
        events,
        admin: req.session.user,        
        user: req.session.user || null,
    });
};

exports.addEvent = async (req, res) => {
    const events = await readJSON(eventsFile);
    const { nom, theme, description, jour, mois, heureDebut, heureFin, type, adresse, acces } = req.body;

    const newEvent = {
        id: Date.now().toString(),
        nom, theme, description,
        jour, mois, heureDebut, heureFin,
        type, adresse, acces,
        actif: true
    };

    events.push(newEvent);
    await writeJSON(eventsFile, events);
    res.redirect('/admin/events');
};

exports.deleteEvent = async (req, res) => {
    let events = await readJSON(eventsFile);
    events = events.filter(e => e.id !== req.params.id);
    await writeJSON(eventsFile, events);
    res.redirect('/admin/events');
};