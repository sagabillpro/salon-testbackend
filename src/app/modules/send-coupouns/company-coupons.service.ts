import {
  Between,
  FindManyOptions,
  FindOneOptions,
  In,
  MoreThan,
  Raw,
} from "typeorm";

import repository from "./company-coupons.repo";
import { CompanyCoupouns } from "./entities/company-coupons.entity";
import contactService from "../contacts/contact.service";
import { sendBirthdayEmail } from "../../services/send-birthday-mail.service";
import { generateCouponCode } from "../../utils/generate-coupons-code.util";
import { handler } from "../../config/dbconfig";
import { Contact } from "../contacts/entities/contact.entity";
import { sendAnniverseryEmail } from "../../services/send-anniversery-mail.service";
import { CoupounsList } from "./entities/coupons-list.entity";

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
    const coupouns = await find({
      where: {
        isActiveted: 1,
        isInactive: 0,
        company: {
          isInactive: 0,
        },
        coupounTypeId: 1,
      },
      relations: {
        company: true,
      },
    });
    //create couponid and company id mapping object
    const companyIdCouponIdMap: { [key: number]: CompanyCoupouns } = {};
    coupouns.forEach((c) => {
      companyIdCouponIdMap[c.companyId] = c;
    });
    const companies = coupouns.map((c) => c.companyId);
    const uniques: number[] = [];

    companies.forEach((c) => {
      if (!uniques.includes(c)) {
        uniques.push(c);
      }
    });
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dataSource = await handler();
    const couponListRepo = dataSource.getRepository(CoupounsList);
    const customers = await dataSource
      .getRepository(Contact)
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.company", "company")
      .andWhere("EXTRACT(MONTH FROM customer.birthDate) = :month", { month })
      .andWhere("EXTRACT(DAY FROM customer.birthDate) = :day", { day })
      .andWhere("company.id IN (:...uniques)", { uniques }) // <-- Added this line
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
        "company.tagLine",
      ])
      .getMany();

    const couponsList: CoupounsList[] = [];
    const emailPromises = customers.map(async (record) => {
      const code = generateCouponCode(5);
      //     const couponCode = await db.getOrGenerateCoupon(customer.id, "BIRTHDAY");
      if (record.email) {
        couponsList.push({
          discountPer: companyIdCouponIdMap[record.companyId].discountPer,
          code: code,
          couponId: companyIdCouponIdMap[record.companyId].id,
          isUsed: 0,
          companyId: record.companyId,

          expireAt: new Date(
            new Date().getTime() +
              companyIdCouponIdMap[record.companyId].expiresIn * 60 * 1000
          ),
        });
        return sendBirthdayEmail({
          customer: {
            name: record.name,
            email: record.email,
          },
          company: {
            tagLine: record.company.tagLine,
            logo: record?.company?.logo,
            name: record?.company?.name,
            email: record?.company?.email,
          },
          expiresIn: companyIdCouponIdMap[record.company.id]?.expiresIn,
          message: companyIdCouponIdMap[record.company.id]?.description,
          couponCode: code,
        });
      }
    });

    // Send all emails in parallel
    await Promise.all(emailPromises);
    //create and save couponsList
    const applicableCpns = couponListRepo.create(couponsList);
    await couponListRepo.save(applicableCpns);
    return;
    //iterate through coupouns
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//1. find multiple records
const anniverseryScheduler = async () => {
  try {
    //get company coupouns from company-coypons where company is active
    const coupouns = await find({
      where: {
        isActiveted: 1,
        isInactive: 0,
        company: {
          isInactive: 0,
        },
        coupounTypeId: 2,
      },
      relations: {
        company: true,
      },
    });
    //create couponid and company id mapping object
    const companyIdCouponIdMap: { [key: number]: CompanyCoupouns } = {};
    coupouns.forEach((c) => {
      companyIdCouponIdMap[c.companyId] = c;
    });

    const companies = coupouns.map((c) => c.companyId);
    const uniques: number[] = [];
    companies.forEach((c) => {
      if (!uniques.includes(c)) {
        uniques.push(c);
      }
    });
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dataSource = await handler();
    const couponListRepo = dataSource.getRepository(CoupounsList);
    const customers = await dataSource
      .getRepository(Contact)
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.company", "company")
      .andWhere("EXTRACT(MONTH FROM customer.anniverseryDate) = :month", {
        month,
      })
      .andWhere("EXTRACT(DAY FROM customer.anniverseryDate) = :day", { day })
      .andWhere("company.id IN (:...uniques)", { uniques }) // <-- Added this line
      .select([
        "customer.id",
        "customer.name",
        "customer.email",
        "customer.anniverseryDate",
        "customer.mobile",
        "customer.birthDate",
        "company.id",
        "company.name",
        "company.logo",
        "company.email",
        "company.tagLine",
      ])
      .getMany();
    const couponsList: CoupounsList[] = [];
    const emailPromises = customers.map(async (record) => {
      const code = generateCouponCode(5);
      //     const couponCode = await db.getOrGenerateCoupon(customer.id, "BIRTHDAY");
      if (record.email) {
        couponsList.push({
          discountPer: companyIdCouponIdMap[record.companyId].discountPer,
          code: code,
          couponId: companyIdCouponIdMap[record.companyId].id,
          isUsed: 0,
          companyId: record.companyId,

          expireAt: new Date(
            new Date().getTime() +
              companyIdCouponIdMap[record.companyId].expiresIn * 60 * 1000
          ),
        });
        return sendAnniverseryEmail({
          customer: {
            name: record.name,
            email: record.email,
          },
          company: {
            tagLine: record.company.tagLine,
            logo: record?.company?.logo,
            name: record?.company?.name,
            email: record?.company?.email,
          },
          expiresIn: companyIdCouponIdMap[record.company.id]?.expiresIn,
          message: companyIdCouponIdMap[record.company.id]?.description,
          couponCode: code,
        });
      }
    });

    // Send all emails in parallel
    await Promise.all(emailPromises);
    //create and save couponsList
    const applicableCpns = couponListRepo.create(couponsList);
    await couponListRepo.save(applicableCpns);
    return;
    //iterate through coupouns
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//1. find multiple records
const sendReferalCode = async (customer: Contact) => {
  try {
    const dataSource = await handler();

    const repo = dataSource.getRepository(CompanyCoupouns);
    //get company coupouns from company-coypons where company is active
    const couponsList: CoupounsList[] = [];
    const coupouns = await repo.findOne({
      where: {
        isActiveted: 1,
        isInactive: 0,
        companyId: customer.companyId,
        coupounTypeId: 3,
      },
      relations: {
        company: true,
      },
      select: {
        company: {
          id: true,
          name: true,
          logo: true,
          email: true,
          tagLine: true,
        },
      },
    });
    if (!coupouns) {
      return;
    }
    const couponListRepo = dataSource.getRepository(CoupounsList);

    const code = generateCouponCode(5);
    if (customer.email) {
      await sendAnniverseryEmail({
        customer: {
          name: customer.name,
          email: customer.email,
        },
        company: {
          tagLine: customer.company.tagLine,
          logo: customer?.company?.logo,
          name: customer?.company?.name,
          email: customer?.company?.email,
        },
        expiresIn: coupouns?.expiresIn,
        message: coupouns.description,
        couponCode: code,
      });
      couponsList.push({
        discountPer: coupouns.discountPer,
        code: code,
        couponId: coupouns.id,
        isUsed: 0,
        companyId: coupouns.companyId,
        expireAt: new Date(
          new Date().getTime() + coupouns.expiresIn * 60 * 1000
        ),
      });
    }
    //create and save couponsList
    const applicableCpns = couponListRepo.create(couponsList);
    await couponListRepo.save(applicableCpns);
    return;
    //iterate through coupouns
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//check if  teh coupon code is valid or not

const validateCouponCode = async (
  companyId: number,
  couponCode: string,
  customerId: number
) => {
  try {
    // const dataSource = await handler();
    // const repo = dataSource.getRepository(CoupounsList);
    // const coupon = await repo.findOne({
    //   where: {
    //     code: couponCode,
    //     companyId,
    //     isUsed: 0,
    //     //and not expired
    //     expireAt: MoreThan(new Date()),
    //     //and not used by the customer
    //   },
    // });
    // if (!coupon) {
    //   //customize below massage based on the error type
    //   throw {
    //     statusCode: 404,
    //     message:
    //       "The coupon you are looking for is either invalid or has expired.",
    //   };
    // }
    // //update coupon status to used
    // await repo.save({ ...coupon, isUsed: 1 });
    return {
      message: "Coupon code has been successfully used.",
      data: {
        customerId,
        discountPer: 2,
        couponId:2
      },
    };
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
  anniverseryScheduler,
  sendReferalCode,
  validateCouponCode,
};
