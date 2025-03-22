import path from "path";
import { transporter } from "../config/smtpconfig";
import * as ejs from "ejs";

export async function sendReferalEmail({
  customer,
  company,
  couponCode,
  expiresIn,
  message,
}: {
  customer: { name: string; email: string };
  couponCode: string;
  company: { tagLine: string; logo: string; name: string; email: string };
  expiresIn: number;
  message: string;
}) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + expiresIn);
  // console.log(currentDate.toDateString()); // Example output: "Thu Mar 27 2025"

  console.log("insode this 2");
  const templatePath = path.join(
    __dirname,
    "../templates",
    "referal.template.ejs"
  );
  const htmlContent = await ejs.renderFile(templatePath, {
    customerName: customer.name,
    companyLogo: company.logo,
    companyName: company.name,
    companyTagline: company.tagLine,
    couponCode,
    couponExpiry: currentDate.toDateString(),
    companyMessage: message,
  });
  console.log("insode this 4");
  const mailOptions = {
    from: `"${company.name}" <${company.email}>`,
    to: customer.email,
    subject: `🎉 Happy Birthday from ${company.name}!`,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}
