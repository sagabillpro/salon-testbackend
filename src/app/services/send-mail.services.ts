import path from "path";
import { transporter } from "../config/smtpconfig";
import * as ejs from "ejs";

export default async function mailer<
  T extends {
    name: string;
    email: string;
    mobile: string;
    message: string;
  }
>(data: T) {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates",
      "inquiry.template.ejs"
    );

    const info = await transporter.sendMail({
      from: '"JH hair & Beauty Studio" <akshaysutarwebsite@gmail.com>', // sender address
      to: `${data.email}`, // list of receivers
      subject: "🙏😇 Thanks for visiting JH hair & beauty studio.", // Subject line
      // text: "Hello world?", // plain text body
      html: await ejs.renderFile(templatePath, {
        data: {
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          message: data.message,
        },
      }), // html body
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
