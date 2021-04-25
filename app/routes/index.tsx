import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/react";
import { Form, useRouteData } from "@remix-run/react";

import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import stylesUrl from "../styles/index.css";
import { rootStorage } from "../utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await rootStorage.getSession(
    request.headers.get("Cookie") ?? undefined
  );

  session.set("foo", "bar");
  const cookie = await rootStorage.commitSession(session);

  return redirect("/", {
    headers: { "Set-Cookie": cookie },
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get("Cookie");
  const session = await rootStorage.getSession(cookie);
  const foo = session.get("foo");
  return { foo };
};

export default function Index() {
  const data = useRouteData();

  return (
    <div>
      <div>foo:{data.foo ?? "not found"}</div>
      <Form method="post">
        <input name="timezone" placeholder="TIMEZONE" />
        <button type="submit">SUBMIT</button>
      </Form>
    </div>
  );
}
