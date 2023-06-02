const express = require('express');
const router = express.Router();
const userAuthRoute = require('./user/auth/signup');
const adminAuthRoute = require('./admin/admin.routes');


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


const adminRoutes = [
    {
        path: '/admin',
        route: adminAuthRoute
    }
];

adminRoutes.forEach((route) => {
    router.use(route.path,
        route.route)
});



module.exports = router;
