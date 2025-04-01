const path = require("path");
const multer = require("multer");
const { post_query_database, get_query_database } = require("../config/database_utils");

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/prescriptions');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * API to create a new prescription.
 */
const post_create_prescription = async (req, res) => {
  try {
    // Handle file upload
    const uploadedFile = req.file ? req.file.filename : null;

    const {
      name,
      reason,
      disease,
      morning,
      afternoon,
      night,
      dosage,
      before_food,
      after_food,
      selected_days,
    } = req.body;

    if (
      !name ||
      !reason ||
      !disease ||
      (!morning && !afternoon && !night) ||
      !dosage ||
      (!before_food && !after_food) ||
      !uploadedFile ||
      !selected_days
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert data into `medical_prescription`
    const insertPrescriptionQuery = `
      INSERT INTO medical_prescription (name, reason, disease, morning, afternoon, night, dosage, before_food, after_food, file_path, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;
    const prescriptionValues = [
      name,
      reason,
      disease,
      morning || 0,
      afternoon || 0,
      night || 0,
      dosage,
      before_food,
      after_food,
      uploadedFile,
    ];
    const prescriptionResult = await post_query_database(insertPrescriptionQuery, prescriptionValues);
    const prescriptionId = prescriptionResult.insertId;

    // Insert data into `medical_repetition`
    const repetitionColumns = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const repetitionValues = new Array(7).fill(0); // Initialize all days with 0
    selected_days.split(',').forEach(day => {
      repetitionValues[day - 1] = 1; // Update the respective day column
    });

    const insertRepetitionQuery = `
      INSERT INTO medical_repetition (prescription_id, ${repetitionColumns.join(", ")}, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;
    const repetitionData = [prescriptionId, ...repetitionValues];
    await post_query_database(insertRepetitionQuery, repetitionData);

    res.status(201).json({ message: "Prescription created successfully" });
  } catch (err) {
    console.error("Error creating prescription:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * API to serve a PDF file.
 */
const get_pdf = (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads/prescriptions", filename);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Error sending file" });
      }
    });
  } catch (err) {
    console.error("Error fetching PDF:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


const get_prescriptions = async (req, res) => {
    try {
      // Query to fetch data from `medical_prescription`
      const query = `
        SELECT id, name AS medicine, 
               CASE 
                 WHEN before_food = 1 THEN 'Before eating' 
                 WHEN after_food = 1 THEN 'After eating' 
                 ELSE 'N/A' 
               END AS time, 
               dosage
        FROM medical_prescription
        WHERE status = 1
      `;
  
      // Fetch data from the database
      const prescriptions = await get_query_database(query);
  
      // Format the dosage field to a string if necessary
      const formattedData = prescriptions.map(item => ({
        id: item.id,
        medicine: item.medicine,
        time: item.time,
        dosage: item.dosage.toString(),
      }));
  
      // Send the formatted response
      res.status(200).json(formattedData);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {
  create_prescription: [upload.single("selected_file"), post_create_prescription],
  get_pdf,
  get_prescriptions
};
