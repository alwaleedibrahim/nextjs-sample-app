import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import UserModel from "./models/users.model";
import dbConnect from "./dbConnection";

dbConnect()
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        await UserModel.create({
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
        });
      }
      return true;
    },
  },
});
