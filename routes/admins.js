const express = require('express');
const { isAuthenticated, isAdmin } = require('../config/auth');
const router = express.Router();

const AdminUser = require('../models/admin');

router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
    try {
        const userId = req.body.id;
        const admin = new AdminUser({ user: userId });
        await admin.save();
        res.sendStatus(201);
    } catch (e) {
        next(systemError(e.message));
    }
});

router.get('/user/:id', isAuthenticated, isAdmin, async (req, res) => {
   try {
    const admin = await AdminUser.findOne({ user: req.params.id });
    res.json(admin);
   } catch (e) {
    next(systemError(e.message));
   }
});

router.get('/admin-user', isAuthenticated, isAdmin, (req, res) => {
    res.sendStatus(200);
});

router.delete('/:id', isAuthenticated, isAdmin, async (req, res, next) => {
    try {
        const userId = req.params.id;
        await AdminUser.deleteOne({ user: userId });
        res.sendStatus(201);
    } catch (e) {
        next(systemError(e.message));
    }
});

module.exports = router;