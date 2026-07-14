const path = require('path');
const { readJSON, writeJSON } = require('../utils/jsonDB');

const usersFile = path.join(__dirname, '../data/users.json');

const bcrypt = require('bcryptjs');


// ===============================
// INSCRIPTION
// ===============================
exports.register = async (req, res) => {

    try {

        const {
            pseudo,
            email,
            profil,
            pass,
            age18
        } = req.body;

        console.log(req.body)


        // Vérifications basiques
        if (!pseudo || !email || !profil || !pass) {
            return res.render('pages/inscription', {
                success: false,
                message: "Tous les champs sont obligatoires.",
                user: req.session.user || null
            });
        }


        if (age18 !== 'on') {
            // Age non confirmé
            return res.render('pages/inscription', {
                success: false,
                message: "Vous devez confirmer avoir plus de 18 ans.",
                user: req.session.user || null
            });
        }


        // Lecture utilisateurs
        const users = await readJSON(usersFile);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.render('pages/inscription', {
                success: false,
                message: "Format d'email invalide.",
                user: req.session.user || null
            });
        }

        // Vérification email existant
        const exists = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );


        if (exists) {
            return res.render('pages/inscription', {
                success: false,
                message: "Cette adresse email est déjà utilisée.",
                user: req.session.user || null
            });
        }


        // Création utilisateur
        const newUser = {

            id: Date.now().toString(),

            pseudo,

            email: email.toLowerCase(),

            profil,

            status: "pending",

            role: "member",

            createdAt: new Date().toISOString(),

            subscription: {
                active: false,
                plan: pass,
                expiresAt: null
            }

        };


        users.push(newUser);


        // Sauvegarde
        await writeJSON(usersFile, users);

        // req.session.user = newUser;

        return res.render('pages/inscription', {
            success: true,
            message: "Votre demande d'inscription a été enregistrée.",
            user: req.session.user || null
        });



    } catch (error) {

        console.error("Erreur inscription :", error);


       // Erreur serveur (catch)
        return res.render('pages/inscription', {
            success: false,
            message: "Erreur serveur, veuillez réessayer.",
            user: req.session.user || null
        });

    }

};




// ===============================
// LOGIN (préparation)
// ===============================

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('pages/login', {
                message: "Tous les champs sont obligatoires.",
                user: null
            });
        }

        const users = await readJSON(usersFile);
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.render('pages/login', {
                message: "Email ou mot de passe incorrect.",
                user: null
            });
        }

        if (user.status === 'pending') {
            return res.render('pages/login', {
                message: "Votre adhésion est en attente de validation. Contactez un administrateur.",
                user: null
            });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.render('pages/login', {
                message: "Email ou mot de passe incorrect.",
                user: null
            });
        }

        req.session.user = {
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            profil: user.profil,
            role: user.role,
            subscription: user.subscription
        };

        if (user.role === 'admin') {
            return res.redirect('/admin');
        }
        return res.redirect('/member/dashboard');

    } catch (error) {
        console.error("Erreur login :", error);
        return res.render('pages/login', {
            message: "Erreur serveur, veuillez réessayer.",
            user: null
        });
    }
};