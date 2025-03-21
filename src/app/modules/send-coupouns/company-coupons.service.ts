import { Between, FindManyOptions, FindOneOptions, In, Raw } from "typeorm";

import repository from "./company-coupons.repo";
import { CompanyCoupouns } from "./entities/company-coupons.entity";
import contactService from "../contacts/contact.service";
import { sendBirthdayEmail } from "../../services/send-birthday-mail.service";
import { generateCouponCode } from "../../utils/generate-coupons-code.util";
import { handler } from "../../config/dbconfig";
import { Contact } from "../contacts/entities/contact.entity";

//1. find multiple records
const find = async (filter?: FindManyOptions<CompanyCoupouns>) => {
  try {
    const repo = await repository();
    return repo.find(filter);
  } catch (error) {
    throw error;
  }
};
//2. find single records
const findById = async (
  id: number,
  filter?: FindOneOptions<CompanyCoupouns> | FindManyOptions<CompanyCoupouns>
) => {
  try {
    const repo = await repository();
    const respo = await repo.findOneById(id, filter);
    return respo;
  } catch (error) {
    throw error;
  }
};

//3. create single record
const create = async (data: CompanyCoupouns) => {
  try {
    const repo = await repository();
    // data = await generateCode(26, data);
    const respo = repo.create({
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: CompanyCoupouns) => {
  try {
    const repo = await repository();
    //   data = await generateCode(14, data);
    const respo = repo.updateById(id, {
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//5. delete single record by id
const deleteById = async (id: number) => {
  try {
    const repo = await repository();
    await repo.deleteById(id);
  } catch (error) {
    throw error;
  }
};

//1. find multiple records
const birthdayScheduler = async () => {
  try {
    //get company coupouns from company-coypons where company is active
    // const coupouns = await find({
    //   where: {
    //     isActiveted: 1,
    //     isInactive: 0,
    //     company: {
    //       isInactive: 0,
    //     },
    //     coupounTypeId: 1,
    //   },
    //   relations: {
    //     company: true,
    //   },
    // });

    // //map through coupouns and create array of companies again fetch customers having birthday today and belongs to the company which are in the array
    // const companies = coupouns.map((c) => c.companyId);
    // const uniques: number[] = [];

    // companies.forEach((c) => {
    //   if (!uniques.includes(c)) {
    //     uniques.push(c);
    //   }
    // });
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    //getting the cusomers having birthday today
    // const customers = await contactService.find({
    //   where: {
    //     //   companyId: In(uniques),
    //     birthDate: Raw(() => `MONTH("birthDate") = ${month} AND DAY("birthDate") = ${day}`),
    //   },
    //   relations: {
    //     company: true,
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     mobile: true,
    //     birthDate: true,
    //     companyId: true,
    //     company: {
    //       id: true,
    //       name: true,
    //       logo: true,
    //       addressLine1: true,
    //     },
    //   },
    // });
    const dataSource = await handler();
    const customers = await dataSource
    .getRepository(Contact)
    .createQueryBuilder("customer")
    .leftJoinAndSelect("customer.company", "company")
    .andWhere("EXTRACT(MONTH FROM customer.birthDate) = :month", { month })
    .andWhere("EXTRACT(DAY FROM customer.birthDate) = :day", { day })
    .select([
      "customer.id",
      "customer.name",
      "customer.email",
      "customer.mobile",
      "customer.birthDate",
      "company.id",
      "company.name",
      "company.logo",
      "company.email",
    ])
    .getMany();

    console.log("chek 1 ");
    console.log(customers);
    const emailPromises = customers.map(async (record) => {
      console.log("insode this 1");
      const code = generateCouponCode(5);
      //     const couponCode = await db.getOrGenerateCoupon(customer.id, "BIRTHDAY");
      if (record.email) {
        console.log("insode this 2");
        return sendBirthdayEmail({
          customer: {
            name: record.name,
            email: record.email,
          },
          company: {
            logo: record?.company?.logo,
            name: record?.company?.name,
            email: record?.company?.email,
          },
          couponCode: code,
        });
      }
    });

    // Send all emails in parallel
    await Promise.all(emailPromises);
    console.log("Reached to all emails in parallel");
    return "ok";
    //iterate through coupouns
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default {
  find,
  findById,
  create,
  deleteById,
  updateById,
  birthdayScheduler,
};
