const path = require('path');
const { readJSON, writeJSON } = require('../utils/jsonDB');

const usersFile = path.join(__dirname, '../data/users.json');


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
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont obligatoires."
            });
        }


        if (!age18) {
            return res.status(400).json({
                success: false,
                message: "Vous devez confirmer avoir plus de 18 ans."
            });
        }


        // Lecture utilisateurs
        const users = await readJSON(usersFile);


        // Vérification email existant
        const exists = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );


        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Cette adresse email est déjà utilisée."
            });
        }


        // Création utilisateur
        const newUser = {

            id: Date.now().toString(),

            pseudo,

            email: email.toLowerCase(),

            profil,

            pass,

            status: "pending",

            role: "member",

            createdAt: new Date().toISOString(),

            subscription: {
                active: false,
                plan: null,
                expiresAt: null
            }

        };


        users.push(newUser);


        // Sauvegarde
        await writeJSON(usersFile, users);

        // req.session.user = newUser;

        return res.render('pages/inscription', {
            success: true,
            message: "Votre demande d'inscription a été enregistrée."
        });



    } catch (error) {

        console.error("Erreur inscription :", error);


        res.status(500).json({

            success:false,

            message:"Erreur serveur."

        });

    }

};




// ===============================
// LOGIN (préparation)
// ===============================
exports.login = async (req,res)=>{

    res.json({
        message:"Login à implémenter"
    });

};