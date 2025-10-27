import Stripe from "stripe";
import { StripeMode } from "../types";

// Open-source version: Only initialize Stripe if API key is present
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
      apiVersion: "2025-05-28.basil",
      appInfo: {
        name: "Dub.co",
        version: "0.1.0",
      },
    })
  : null;

// Original code (for reference):
// export const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
//   apiVersion: "2025-05-28.basil",
//   appInfo: {
//     name: "Dub.co",
//     version: "0.1.0",
//   },
// });

const secretMap: Record<StripeMode, string | undefined> = {
  live: process.env.STRIPE_APP_SECRET_KEY,
  test: process.env.STRIPE_APP_SECRET_KEY_TEST,
  sandbox: process.env.STRIPE_APP_SECRET_KEY_SANDBOX,
};

// Stripe Integration App client
export const stripeAppClient = ({ mode }: { mode?: StripeMode }) => {
  const appSecretKey = secretMap[mode ?? "test"];

  return new Stripe(appSecretKey!, {
    apiVersion: "2025-05-28.basil",
    appInfo: {
      name: "Dub.co",
      version: "0.1.0",
    },
  });
};
