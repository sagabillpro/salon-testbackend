import { compare, genSalt, hash } from "bcryptjs";

export async function comparePassword(
  provdedPass: string,
  storedPass: string
): Promise<boolean> {
  const passwordMatches = await compare(provdedPass, storedPass);
  return passwordMatches;
}

// round: number = 10;
export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  return await hash(password, salt);
}
