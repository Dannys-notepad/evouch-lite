const router = require('express').Router();
const { signPage, messagePage } = require('./page.controller')

router.get('/sign', signPage)
router.get('/message', messagePage)

module.exports = router;
