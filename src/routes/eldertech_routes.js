const express = require("express")
const dietary_choices = require("../controllers/dietary_choices")
const medical_prescription = require("../controllers/medical_prescription")
const validate_user = require("../controllers/validte_user")


const router = express.Router()

router.get("/dietaryChoices",dietary_choices.get_dietary_choices)
router.post("/prescription/create",medical_prescription.create_prescription)
router.post("/prescription/view",medical_prescription.get_pdf)
router.get("/prescription/getAll",medical_prescription.get_prescriptions)
router.get("/validateUser",validate_user.validate_user)

module.exports = router;