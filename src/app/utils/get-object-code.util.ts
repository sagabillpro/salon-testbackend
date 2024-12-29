import { Code } from "typeorm";
import { handler } from "../config/dbconfig";
import { FeatureCodes } from "../modules/fetaure-settings/entities/feature-codes.entity";
import { FeatureSettings } from "../modules/fetaure-settings/entities/feature-setting.entity";

export const generateCode = async <T extends { code: string }>(
  featureId: number,
  record: T,
  isAdd: boolean = true
): Promise<T> => {
  const dataSource = await handler();
  const featureSettingRepo = dataSource.getRepository(FeatureSettings);
  const objectCodesRepo = dataSource.getRepository(FeatureCodes);
  //1. if edit case then check record code is editd or not
  if (isAdd) {
    //1. generate series as per the feature
    const date = new Date();

    // Format 1: YYYY-MM-DD
    const format2 = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const feature = await featureSettingRepo.findOne({
      where: {
        id: featureId,
      },
    });
    const series = feature?.fixedCode + "-" + format2;

    //2. in add case check of record present for given fetaure in db
    const foundSeries = await objectCodesRepo.findOne({
      where: {
        series: series,
        feature: {
          id: featureId,
        },
      },
    });

    let resultCode = "";

    //3. if not then create
    if (foundSeries) {
      resultCode =
        series +
        "-" +
        String(Number(foundSeries?.codeNumber) + 1).padStart(4, "0");
      // increament code number by 1
      await objectCodesRepo.save({
        ...foundSeries,
        codeNumber: Number(foundSeries.codeNumber + 1),
      });
    } else {
      const currentDate = new Date().toISOString();
      //4.if found then generate new code and increament number by
      const respo = objectCodesRepo.create({
        series: series,
        codeNumber: 1,
        createdDate: currentDate,
        modifiedDate: currentDate,
        feature: {
          id: featureId,
        },
      });
      resultCode = series + "-" + String(1).padStart(4, "0");

      await objectCodesRepo.save(respo);
      //5.return record with new code appended
    }
    return {
      ...record,
      code: resultCode,
    };
  } else {
    return record;
  }
};
