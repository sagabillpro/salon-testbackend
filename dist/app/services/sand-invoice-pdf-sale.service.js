// const nodemailer = require("nodemailer");
// import path from "path";
// import { transporter } from "../config/smtpconfig";
// import * as ejs from "ejs";
// const PDFDocument = require("pdfkit");
// const cloudinary = require("cloudinary").v2;
// import fs from "fs"
// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: "your-cloud-name",
//     api_key: "your-api-key",
//     api_secret: "your-api-secret",
// });
// // Function to create a PDF
// const createPDF = async (data, outputPath) => {
//     return new Promise((resolve, reject) => {
//         ejs.renderFile("./templates/invoice.ejs", data, (err, html) => {
//             if (err) return reject(err);
//             const doc = new PDFDocument();
//             doc.pipe(fs.createWriteStream(outputPath));
//             doc.text(html, { align: "left" });
//             doc.end();
//             resolve("");
//         });
//     });
// };
// // Function to upload a file to Cloudinary
// const uploadToCloudinary = async (filePath, folder) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(
//             filePath,
//             { folder },
//             (error, result) => {
//                 if (error) return reject(error);
//                 resolve(result.secure_url); // Return the secure URL of the uploaded file
//             }
//         );
//     });
// };
// // Function to send email with the invoice link
// const sendEmail = async (recipientEmail, subject, text, attachmentLink) => {
//     const mailOptions = {
//         from: '"Your Business Name" <your-email@gmail.com>',
//         to: recipientEmail,
//         subject: subject,
//         text: `${text}\n\nView your invoice here: ${attachmentLink}`,
//     };
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${recipientEmail}`);
// };
// // Example invoice data
// const invoiceData = {
//     invoiceNumber: "INV-12345",
//     date: new Date().toLocaleDateString(),
//     customer: {
//         name: "John Doe",
//         email: "johndoe@example.com",
//     },
//     items: [
//         { name: "Service A", quantity: 2, price: 50 },
//         { name: "Product B", quantity: 1, price: 75 },
//     ],
//     total: 175, // Sum of all item totals
// };
// // Main function
// (async () => {
//     const outputPath = "./invoice.pdf";
//     const cloudinaryFolder = "invoices";
//     try {
//         // 1. Generate the PDF
//         await createPDF(invoiceData, outputPath);
//         console.log("Invoice PDF created.");
//         // 2. Upload to Cloudinary
//         const invoiceUrl = await uploadToCloudinary(outputPath, cloudinaryFolder);
//         console.log("Invoice uploaded to Cloudinary:", invoiceUrl);
//         // 3. Send email with the Cloudinary URL
//         await sendEmail(
//             "customer@example.com", // Recipient email
//             "Your Invoice from Business Name",
//             "Please find your invoice attached.",
//             invoiceUrl
//         );
//         // 4. Cleanup the temporary file
//         fs.unlinkSync(outputPath);
//         console.log("Temporary PDF file deleted.");
//     } catch (error) {
//         console.error("Error:", error);
//     }
// })();
//# sourceMappingURL=sand-invoice-pdf-sale.service.js.map