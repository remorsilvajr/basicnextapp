import { betterAuth, BetterAuthOptions } from "better-auth";
import { bearer } from "better-auth/plugins";
import { pool } from "./db";

export const authOptions = {
    database: pool,

    user: { 
        modelName: "users",
        additionalFields: {
            active: {
                type: "boolean",
            },
        },
    },
    session: { 
        modelName: "sessions",
    },
    account: { modelName: "accounts" },
    verification: { modelName: "verifications" },

    emailAndPassword: {
        enabled: true,
    },

    plugins: [
        bearer(),
    ],

    secret: process.env.BETTER_AUTH_SECRET || "oY3LBSAP3ExKApieB02xirc8lePYUtAf",

    // ✅ Production / serverless settings
    baseURL: process.env.BETTER_AUTH_URL || `https://${process.env.VERCEL_URL}` || "http://localhost:3000",
    trustedOrigins: [
        "http://localhost:3000",
        "https://basicnextapp-eight.vercel.app/",
    ],
     //advanced: {
      //  trustHost: true,
     //},
} satisfies BetterAuthOptions;

export const auth = betterAuth(authOptions);

export type Auth = typeof auth;
export type AuthOptions = typeof authOptions;