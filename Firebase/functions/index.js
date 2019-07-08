//Imporrts 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const cors = require('cors')({origin: true});

// for development only
const firebaseConfig = {
    apiKey: "AIzaSyAVnfq4hIqbP1FbbeH50TnpPk-6sXPu7jI",
    authDomain: "hotelmanagement-684f5.firebaseapp.com",
    databaseURL: "https://hotelmanagement-684f5.firebaseio.com",
    projectId: "hotelmanagement-684f5",
    storageBucket: "hotelmanagement-684f5.appspot.com",
    messagingSenderId: "450728556816",
    appId: "1:450728556816:web:03e83944070f0e54"
};
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);


// for development only
// Credentials for firebase serving 
var serviceAccount = require("./creds/serviceAccountKey.json");
//initializeApp
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hotelmanagement-684f5.firebaseio.com"
});

// //initializeApp [for Server and Deployment]
// admin.initializeApp();

// initilalizing cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const db = admin.firestore();

app.get('/', (req, res) => {
    res.json({message : "Application is working fine"});
})

app.get('/rooms', (req, res) => {
    //Enabling fetch API
    cors(req, res, () => {});
    res.set('Access-Control-Allow-Origin', '*');

    db.collection('rooms')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data =>{
            let rooms = [];
            data.forEach(doc => {
                rooms.push(doc.data()); 
            }) 
            return res.json(rooms);
    })
    .catch(err => console.log(err));
})


// Middle Ware
const FBAuth = (req , res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token Found');
        return res.status(403).json({ error : `UnAuthorized`});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user =  decodedToken;
            console.log(decodedToken)
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error('Erro while verifying Token');
            return res.status(403).json(err);
        })
}

app.post('/room',   (req, res) => {
        
    const newRoom = {
        title: req.body.title,
        roomId: req.body.roomId,
        desc: req.body.desc,
        price: req.body.price,
        rating: req.body.rating,
        facilities: req.body.facilities,
        available: req.body.available,
        image: req.body.image,
        createdAt : new Date().toISOString()
    }

    db
        .collection('rooms')
        .add(newRoom)
        .then(doc => {
            res.json( { message : `document ${doc.id} created Successfully`})
        })
        .catch(err => {
            res.status(500).json({error : "someting went wrong" })
            console.log(err);
        })
})


// Validation
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true;
    else return false ;
} 
const isEmpty = (string) => {
    if(string.trim() === "") return true;
    else return false;
}


// Signup route 
app.post('/signup', (req, res) => {
    //Enabling fetch API
    cors(req, res, () => {});
    res.set('Access-Control-Allow-Origin', '*');
    
    let handle = req.body.email.split('@')[0];

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    // Validation 
    let errors = {};

    if(isEmpty(newUser.email)){
        errors.email = "Must not be Empty"
    }else if (!isEmail(newUser.email)){
        errors.email = "Must be a valid Email Address"
    }

    if(isEmpty(newUser.password)) errors.password = "Must not be Empty";
    if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Passwords must Match";

    if(Object.keys(errors).length > 0) return res.status(400).json(errors);


    // TODO Validate Data
    let token, userId;
    console.log(handle);
    db.doc(`/users/${handle}`).get()
        .then(doc =>{
            if(doc.exists){
                return res.status(400).json({email :  `this email is already taken`});
            } else{
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);          
            }
        })
        .then(data  => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };

            return db.doc(`/users/${handle}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({token}); 
        })
        .catch(err => {
            console.error(err);
            if(err.code === "auth/email-already-in-use"){
                return res.status(400).json({email: "Email is alredy in use"})
            }else {
                return res.status(500).json({error: err.code});
            }
        })

    // firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    //     .then(data => {
    //         return res.status(201).json({message: `user ${data.user.uid} signed up successfully`});
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         return res.status(500).json({error : err.code});
    //     })
})

app.post('/login', cors ,(req, res) => {

    //Enabling fetch API
    cors(req, res, () => {});
    res.set('Access-Control-Allow-Origin', '*');

    const user = {
        email : req.body.email ,
        password : req.body.password
    };


    let errors = {};

    if(isEmpty(user.email)) errors.email = "Must not be Empty"
    if(isEmpty(user.password)) errors.password = "Please fill in the Password"

    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.error(err);
            
            // Response for incorrect Password
            if(err.code === "auth/wrong-password"){
                return res.status(400).json({general : "Wrong Password : Please try again"})
            }else if(err.code === "auth/user-not-found") {
                return res.status(400).json({general : "No user found : Please try again ..."})
            } {
                return res.status(500).json({ error: err.code});
            }
        })
})

exports.api = functions.https.onRequest(app);