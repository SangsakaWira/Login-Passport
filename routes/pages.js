const express = require("express")
const router = express.Router()

const pagesController = require("../controllers/pages")

router.get("/auth",pagesController.getAuthPage)
router.get("/dashboard",pagesController.getDashPage)

module.exports = router