const express = require("express")
const dietary_choices = require("../controllers/dietary_choices")
const medical_prescription = require("../controllers/medical_prescription")
const validate_user = require("../controllers/validte_user")
const sugar_levels = require("../controllers/sugar_levels")
const heart_rates = require("../controllers/heart_rates")


const router = express.Router()

router.get("/dietaryChoices",dietary_choices.get_dietary_choices)
router.post("/prescription/create",medical_prescription.create_prescription)
router.post("/prescription/view",medical_prescription.get_pdf)
router.get("/prescription/getAll",medical_prescription.get_prescriptions)
router.get("/validateUser",validate_user.validate_user)
router.get("/getSugarLevels",sugar_levels.get_sugar_levels);
router.get("/getHeartRates",heart_rates.get_heart_rates);


module.exports = router;