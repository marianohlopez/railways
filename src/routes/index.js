import { Router } from 'express';
import passport from "passport";
import { authController } from "../controllers/index.js";
import compression from 'compression';
import generateFaker from '../faker.js';
import logger from '../lib/logger.js';

const router = Router()

router.get('/', (req, res) => {
    res.send("bienvenidos a mi sitio");
})

router
    .route('/login')
    .get(authController.getLogin)
    .post(
        passport.authenticate("login", { failureRedirect: "/fail-login" }),
        authController.getLogin
    );

router
    .route("/register")
    .get(authController.getRegister)
    .post(
        passport.authenticate("register", { failureRedirect: "/fail-register" }),
        authController.getLogin
    );

router.get("/fail-login", authController.getLoginFailiure);
router.get("/fail-register", authController.getRegisterFailiure);

router.get("/logout", authController.logOut);

router.get('/login/productos', (req, res) => {
    try {
        const { user } = req.session.passport;
        console.log(req.session);
        if (!user) { return res.redirect('/login') }
        res.render('form', { user })
    }
    catch (err) {
        logger.error(err)
    }
})

router.route('/api/productos-test').get((req, res) => {
    try {
        res.render('test', { items: generateFaker() })
    }
    catch (err) {
        logger.error(err)
    }
})

router.get("/info", compression(), authController.info)

router.get("/info-uncomp", authController.info)

router.get("/api/random", authController.getRandom)

export default router;