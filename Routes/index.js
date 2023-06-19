const express = require('express');
const router = express.Router();
const userAuthRoute = require('./user/userRoutes');
const adminAuthRoute = require('./admin/adminRoutes');
const pdfRoute = require('../pdfConverter/pdfRoutes');
const pdfUser = require('../pdfConverter/pdfuser');
const pdfFine = require('../pdfConverter/pdfFine');

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

const pdfRoutes =[{
    path: '/pdf',
    route: pdfRoute
}]

pdfRoutes.forEach((route) => {

    router.use(route.path,
        route.route)
})

 const pdfRouteUser =[{
    path: '/pdfUser',
    route: pdfUser
}]

pdfRouteUser.forEach((route) => {
    router.use(route.path,
        route.route)
})

const pdfFines =[{
    path: '/pdfFine',
    route: pdfFine
}]

pdfFines.forEach((route) => {
    router.use(route.path,
        route.route)
})

module.exports = router
