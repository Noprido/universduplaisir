const path = require('path');
const bcrypt = require('bcryptjs');
const { readJSON, writeJSON } = require('../utils/jsonDB');

const usersFile = path.join(__dirname, '../data/users.json');
const eventsFile = path.join(__dirname, '../data/events.json');
const passwordsFile = path.join(__dirname, '../data/passwords.json');

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
    const passwords = await readJSON(passwordsFile);
    const pending = users.filter(u => u.status === 'pending');
    const active = users.filter(u => u.status === 'active');
    const rejected = users.filter(u => u.status === 'rejected');
    res.render("admin/dashboard", {
        title: "Administration",
        pending,
        active,
        rejected,
        passwords,
        admin: req.session.user,
        user: req.session.user 
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

    const passwords = await readJSON(passwordsFile);
    const filtered = passwords.filter(p => p.userId !== users[index].id);
    filtered.push({
        userId: users[index].id,
        plainPassword,
        generatedAt: new Date().toISOString()
    });
    await writeJSON(passwordsFile, filtered);

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
        user: req.session.user,
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

exports.passwords = async (req, res) => {
    const passwordsFile = path.join(__dirname, '../data/passwords.json');
    const passwords = await readJSON(passwordsFile);
    res.render('admin/passwords', {
        title: 'Mots de passe membres',
        passwords,
        admin: req.session.user
    });
};