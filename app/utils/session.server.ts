import { createCookieSessionStorage } from "@remix-run/node";

let secret = "not-at-all-secret";
// if (process.env.SESSION_SECRET) {
//   secret = process.env.SESSION_SECRET;
// } else if (process.env.NODE_ENV === "production") {
//   throw new Error("Must set SESSION_SECRET");
// }

const rootStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [secret],
    sameSite: "lax",
    path: "/",
  },
});

export { rootStorage };
