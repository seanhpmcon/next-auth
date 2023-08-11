import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID,
            clientSecret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.refresh_token = account.refresh_token;
            }
            return token
        },
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.role = 'admin';
          session.refresh_token = token.refresh_token;

          return session
        }
      }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }