const express = require('express');
const router = express.Router();
const userAuthRoute = require('./user/auth/signup');

const defaultRoutes = [
    {
        path: '/user',
        route: userAuthRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path,
        route.route)
});

module.exports = router;
