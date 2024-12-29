import { FindManyOptions, FindOneOptions } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, DUserType, States } from "../general-data/entities";
import repository from "./user.repo";
import { Users } from "./entities/user.entity";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyToken,
} from "../../services";
import { UserSessions } from "./entities/user-sessions.entity";

//1. find multiple records
const find = async (filter?: FindManyOptions<Users>) => {
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
  filter?: FindOneOptions<Users> | FindManyOptions<Users>
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
const create = async (data: Users) => {
  try {
    const dataSource = await handler();
    const userTypeRepo = dataSource.getRepository(DUserType);
    const userType = await userTypeRepo.findOne({
      where: {
        id: data.userType.id,
      },
    });
    if (!userType) {
      throw {
        message: "Record not found with id: " + data.userType.id,
        statusCode: 404,
      };
    }

    const repo = await repository();
    data = await generateCode(18, data);
    //hash your password here
    const hashedPassword = await hashPassword(data.password);
    const respo = repo.create({
      ...data,
      password: hashedPassword,
      userType,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: Users) => {
  try {
    const dataSource = await handler();
    const userTypeRepo = dataSource.getRepository(DUserType);
    const userType = await userTypeRepo.findOne({
      where: {
        id: data.userType.id,
      },
    });
    if (!userType) {
      throw {
        message: "Record not found with id: " + data.userType.id,
        statusCode: 404,
      };
    }

    const repo = await repository();
    data = await generateCode(14, data);
    const respo = repo.updateById(id, {
      ...data,
      userType,
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

//6. user login
const login = async (data: {
  userName: string;
  password: string;
}): Promise<
  | {
    refreshTokenToken: string;
    accessToken: string;
  }
  | Error
> => {
  //1. find user with UserName
  const dataSource = await handler();
  const userSessionRepo = dataSource.getRepository(UserSessions);
  const repo = await repository();
  const foundUser = await repo.findOne({
    where: {
      userName: data.userName,
    },
    relations: {
      userType: true,
    },
  });
  if (foundUser) {
    //2. check and compare password
    const verfied = await comparePassword(data.password, foundUser?.password);
    if (verfied) {
      //3. create jwt
      //a. create refresh token and store in db
      const accessToken = generateAccessToken({
        userId: foundUser.id,
        userName: foundUser.userName,
        email: foundUser.email,
        userType: foundUser.userType,
      });
      //b. create accestoken
      const refreshTokenToken = generateRefreshToken({
        userId: foundUser.id,
        userName: foundUser.userName,
        email: foundUser.email,
        userType: foundUser.userType,
      });
      const currentDate = new Date().toISOString();
      //4. store refresh token in db
      const userSession = userSessionRepo.create({
        user: foundUser,
        token: refreshTokenToken,
        createdDate: currentDate,
        isInactive: 0,
        modifiedDate: currentDate,
      });
      await userSessionRepo.save(userSession);
      //4. send accessToken and refreshToken in response
      return {
        refreshTokenToken,
        accessToken,
      };
    } else {
      throw { message: "Invalid password !", statusCode: 401 };
    }
  } else {
    throw { message: "User not found", statusCode: 404 };
  }
};

//6. user login
const logout = async (data: {
  token: string
}) => {

  try {
    const dataSource = await handler();
    const userSessionRepo = dataSource.getRepository(UserSessions);
    //1. check if active refresh token is present decoded user
    const userData: {
      userId: number,
      userName: string;
      email: string;
      userType: {
        id: number;
        name: string;
      };
    } = verifyToken(data.token);
    if (userData) {
      const foundSession = await userSessionRepo.findOne({
        where: {
          token: data.token,
          isInactive: 0,
          user: {
            id: userData?.userId
          }
        }
      })
      if (foundSession) {
        //make session inactive
        await userSessionRepo.save({
          ...foundSession,
          isInactive: 1,
        });
        return { status: 200, message: "user logged out succesfully..." }
      } else {
        throw { message: "Active Session not found for this user", statusCode: 404 };
      }
    }
  } catch (err) {
    throw err;
  }
};

//6. user login
const generateNewAccessToken = async (data: {
  token: string
}) => {
  try {
    const dataSource = await handler();
    const userSessionRepo = dataSource.getRepository(UserSessions);
    //1. check if active refresh token is present decoded user
    const userData: {
      userId: number,
      userName: string;
      email: string;
      userType: {
        id: number;
        name: string;
      };
    } = verifyToken(data.token);
    if (userData) {
      const foundSession = await userSessionRepo.findOne({
        where: {
          token: data.token,
          isInactive:0,
          user: {
            id: userData?.userId
          }
        }
      })
      if (foundSession) {
        const accessToken = generateAccessToken({
          userId: userData.userId,
          userName: userData.userName,
          email: userData.email,
          userType: userData.userType,
        });
        return { accessToken }
      } else {
        throw { message: "Active Session not found for this user", statusCode: 404 };
      }
    }
  } catch (err) {
    throw err;
  }

};
export default {
  find,
  findById,
  create,
  deleteById,
  updateById,
  login,
  generateNewAccessToken,
  logout,
};
