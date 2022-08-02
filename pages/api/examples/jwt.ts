// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import { config } from "../../../oidc/src/config"

const secret = config.NEXTAUTH_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret })
  res.send(JSON.stringify(token, null, 2))
}
