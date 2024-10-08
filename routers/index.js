const express = require('express');
const router = express('router');

router.get ("/",function (req, res) {
    res.send("hello")
})

module.exports = router