const router = require('express').Router()
const { eventPage } = require('./event.controller')

router.get('/', eventPage)

module.exports = router;