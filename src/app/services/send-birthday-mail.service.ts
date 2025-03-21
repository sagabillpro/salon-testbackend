import path from "path";
import { transporter } from "../config/smtpconfig";
import * as ejs from "ejs";

export async function sendBirthdayEmail({
  customer,
  company,
  couponCode,
}: {
  customer: { name: string; email: string };
  couponCode: string;
  company: { logo: string; name: string; email: string };
}) {
    console.log("insode this 2");
  const templatePath = path.join(
    __dirname,
    "../templates",
    "birthday.template.ejs"
  );
  const htmlContent = await ejs.renderFile(templatePath, {
    customerName: customer.name,
    companyLogo: company.logo,
    companyName: company.name,
    companyTagline: "sample tagline",
    couponCode,
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

