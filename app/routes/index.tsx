import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/react";

import { Form, useRouteData } from "@remix-run/react";

import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = () => {
  return { message: "this is awesome 😎" };
};

export default function Index() {
  let data = useRouteData();

  return (
    <div>
      <Form>
        <input name="timezone" placeholder="TIMEZONE" />
        <button type="submit">SUBMIT</button>
      </Form>
    </div>
  );
}
