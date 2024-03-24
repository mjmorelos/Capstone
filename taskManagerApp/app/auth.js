import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./utility/utils";
import bcrypt from "bcryptjs";
import { User } from "./utility/models";
import { React } from "react";

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ name: credentials.name });
    if (!user || !user.isActive) throw new Error("Wrong credentials!"); //必须aami才可

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Your authentication logic...
        const user = await login(credentials);
        if (user) {
          // Ensure you return an object containing at least a `name` property
          return {
            email: user.email,
            name: user.name,
            image: user.image,
            isAdmin: user.isAdmin,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.image = user.image;
        token.isAdmin = user.isAdmin;
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
        session.user.id = token.uid;
      }
      return session;
    },
  },
});
