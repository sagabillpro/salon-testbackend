import { FindManyOptions, FindOneOptions } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { Taxes } from "./entities/taxes.entity";
import repository from "./taxes.repo";
import { PurchaseHeaders } from "../purchase-items/entities/purchase-headers.entity";
import { PurchaseLines } from "../purchase-items/entities/purchase-lines.entity";
import { TaxGroup } from "../taxes/entities/tax-groups.entity";
import { SaleLines } from "../sale-items/entities/sale-lines.enity";
import { SaleHeaders } from "../sale-items/entities/sale-header.entity";
//1. find multiple records
const find = async (filter?: FindManyOptions<Taxes>) => {
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
  filter?: FindOneOptions<Taxes> | FindManyOptions<Taxes>
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
const create = async (data: Taxes) => {
  try {
    const repo = await repository();
    data = await generateCode(14, data);

    const respo = repo.create({
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: Taxes) => {
  try {
    const repo = await repository();
    data = { ...data };
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

async function getOutputGst(companyId: number) {
  const dataSource = await handler();
  const saleLinesLineRepo = dataSource.getRepository(SaleLines);

  const outputGst = await saleLinesLineRepo
    .createQueryBuilder("sale_lines")
    .innerJoin(
      SaleHeaders,
      "sale_headers",
      "sale_lines.txnHeaderId = sale_headers.id"
    )
    .innerJoin(TaxGroup, "tax_groups", "sale_lines.taxGroupId = tax_groups.id")
    .from(
      (qb) =>
        qb
          .select(
            'jsonb_array_elements(sale_lines."taxGroupComponents")',
            "tax_info"
          )
          .from(SaleLines, "sale_lines"),
      "tax_info"
    )
    .select("tax_groups.name", "tax_group_name")
    .addSelect("tax_info->>'name'", "tax_name")
    .addSelect("SUM((tax_info->>'taxAmount')::numeric)", "total_tax")
    .where("sale_headers.companyId = :companyId", { companyId })
    .groupBy("tax_groups.name, tax_info->>'name'")
    .getRawMany();

  return outputGst;
}

async function getInputGst(companyId: number) {
  const dataSource = await handler();
  const purchaseLineRepo = dataSource.getRepository(PurchaseLines);

  const inputGst = await purchaseLineRepo
    .createQueryBuilder("purchase_lines")
    .innerJoin(
      PurchaseHeaders,
      "purchase_headers",
      "purchase_lines.txnHeaderId = purchase_headers.id"
    )
    .innerJoin(
      TaxGroup,
      "tax_groups",
      "purchase_lines.taxGroupId = tax_groups.id"
    )
    .from(
      (qb) =>
        qb
          .select(
            'jsonb_array_elements(purchase_lines."taxGroupComponents")',
            "tax_info"
          )
          .from(PurchaseLines, "purchase_lines"),
      "tax_info"
    )
    .select("tax_groups.name", "tax_group_name")
    .addSelect("tax_info->>'name'", "tax_name")
    .addSelect("SUM((tax_info->>'taxAmount')::numeric)", "total_tax")
    .where("purchase_headers.companyId = :companyId", { companyId })
    .groupBy("tax_groups.name, tax_info->>'name'")
    .getRawMany();

  return inputGst;
}

/**
 * Function to calculate the final GST report.
 * @param companyId - The company ID to fetch GST details.
 * @returns Final GST data including net payable/refundable GST.
 */
async function calculateGstReport(companyId: number) {
  const outputGst = await getOutputGst(companyId);
  const inputGst = await getInputGst(companyId);

  let totalOutputGst = 0;
  let totalInputGst = 0;

  // Convert query results into a structured format
  const outputSummary = outputGst.reduce((acc, item) => {
    totalOutputGst += Number(item.total_tax);
    const taxRate = item.tax_group_name;
    acc[taxRate] = acc[taxRate] || { cgst: 0, sgst: 0, igst: 0, total: 0 };
    acc[taxRate].total += Number(item.total_tax);
    return acc;
  }, {});

  const inputSummary = inputGst.reduce((acc, item) => {
    totalInputGst += Number(item.total_tax);
    const taxRate = item.tax_group_name;
    acc[taxRate] = acc[taxRate] || { cgst: 0, sgst: 0, igst: 0, total: 0 };
    acc[taxRate].total += Number(item.total_tax);
    return acc;
  }, {});

  // Calculate Net GST (Payable or Refundable)
  const netPayable = totalOutputGst - totalInputGst;
  const status = netPayable >= 0 ? "Payable" : "Refundable";

  return {
    outputGst: outputSummary,
    inputGst: inputSummary,
    totalOutputGst,
    totalInputGst,
    netPayable,
    status,
  };
}

export default {
  find,
  findById,
  create,
  deleteById,
  updateById,
  getOutputGst,
  getInputGst,
  calculateGstReport,
};
