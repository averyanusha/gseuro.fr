// import express from "express";
// import { check, validationResult } from "express-validator";
// import bodyParser from "body-parser";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public'))); // Create a public folder for your static files

// // Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.post('/submit-form', [
//   check('email', 'Veuillez renseigner une adresse email valide!').isEmail(),
//   check('phone', 'Veuillez renseigner un numéro de téléphone valide!').isMobilePhone()
// ], (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }
  
//   // Process form data (for now just confirm it's received)
//   return res.json({ success: true, message: "Form submitted successfully" });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });