// import express from "express";
// import ejs from "ejs";
// import path from "path";
// import { fileURLToPath } from "url";
// const __dirname = path.dirname(__filename);
// const app = express();
// app.use(express.json());
// app.set("view engine", "ejs");
// // export async function generateInvoicePdfFromEjs(invoiceData) {
// //   // Path to your EJS template file
// //   const renderedPath = path.join(
// //     process.cwd(),
// //     "/dist/app/templates",
// //     "sale-invoice.template.ejs"
// //   );
// //   console.log("renderedPath", renderedPath);
// //   // Render the EJS template to HTML
// //   const html:string = await ejs.renderFile(renderedPath, invoiceData);
// //   // Render the EJS template to HTML using the invoice data
// // //   const html = await ejs.renderFile(
// // //     path.join(__dirname, "invoice.ejs"),
// // //     invoiceData
// // //   );
// //   // Launch Puppeteer Core with the custom Chromium executable
// //   const browser = await puppeteer.launch({
// //     args: chromium.args,
// //     executablePath: await chromium.executablePath(),
// //     headless: chromium.headless,
// //   });
// //   const page = await browser.newPage();
// //   await page.setContent(html);
// //   // Generate the PDF as a Buffer
// //   const pdfBuffer = await page.pdf({ format: "A4" });
// //   await browser.close();
// //   return pdfBuffer;
// // }
// app.post("/generate-invoice", async (req, res) => {
//   try {
//     const invoiceData = req.body;
//     const pdfBytes = await generateInvoicePdfFromEjs(invoiceData);
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
//     res.send(pdfBytes);
//   } catch (error) {
//     console.error("Error generating invoice:", error);
//     res.status(500).send("Error generating invoice");
//   }
// });
// app.get("/health", (req, res) => {
//   res.send("OK");
// });
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
//# sourceMappingURL=invoice-download.service.js.map