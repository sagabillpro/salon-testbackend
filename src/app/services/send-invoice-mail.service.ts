import path from "path";
import { transporter } from "../config/smtpconfig";
import * as ejs from "ejs";

class invoiceDetails {
  customer: string;
  txnDate: string;
  txnId: string;
  mobile: string;
  subTotal: number;
  tax: number;
  discount: number;
  total?: number;
  email: string;
  itemData?: {
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
    tax: number;
    taxName: string
  }[];
}
export default async function invoiceMailer<T extends invoiceDetails>(data: T) {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates",
      "customerinvoice.template.ejs"
    );

    const info = await transporter.sendMail({
      from: '"JH hair & Beauty Studio" <jawedhabibgad@gmail.com>', // sender address
      to: `${data.email}`, // list of receivers
      subject: "🙏😇 Thanks for visiting JH hair & beauty studio.", // Subject line
      // text: "Hello world?", // plain text body
      html: await ejs.renderFile(templatePath, {
        data:{
            ...data
          }
      }), // html body
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
