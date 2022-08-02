import { UserCredential } from "../../../../src/UserCredentials/domain/UserCredential";
import { Nullable } from "../../../../src/shared/domain/Nullable";
import { context } from "./context";

interface Request {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  profilePicture?: string;
}

export async function findUserName(username: string): Promise<Nullable<UserCredential>> {
  // email is property used instead of username envolved
  const data = await context.prisma.userCredentials.findFirst({
    where: {
      email: username,
    },
  });
  if (data?.isActive) {
    return UserCredential.fromPrimitives(data);
  }
  return null;
}
