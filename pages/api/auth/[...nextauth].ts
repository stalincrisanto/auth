import NextAuth from "next-auth"

export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: "mediaValue",
      name: "Media Value",
      type: "oauth",
      clientId: "app",
      clientSecret: "scorpion",
      wellKnown: "http://localhost:3003/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid offline_access email profile",
          prompt: "consent",
        },
      },
      token: {
        params: {
          scope: "openid offline_access email profile",
        },
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        console.log("profile =>", profile)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("ESTO AQUI Y TENGO ERRORES");
      console.log("user =>", user)
      console.log("account =>", account)
      console.log("profile =>", profile)
      console.log("email =>", email)
      console.log("credentials =>", credentials)
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log("url =>", url)
      console.log("baseUrl =>", baseUrl)
      return url
    },
    async session({ session, token, user }) {
      console.log("user =>", user)
      console.log("token =>", token)
      console.log("session =>", session)
      return session
    },
    async jwt({ token }) {
      console.log("token =>", token)
      token.userRole = "admin"
      return token
    },
  },
  debug: true
})
