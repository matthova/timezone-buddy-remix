import type { LinksFunction, LoaderFunction } from "@remix-run/react";
import {
  Meta,
  Links,
  Scripts,
  useMatches,
  useRouteData,
  useLiveReload,
} from "@remix-run/react";

import { Outlet } from "react-router-dom";

import stylesUrl from "./styles/global.css";
import { LiveReloadNoJs } from "./components";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = () => {
  return { date: new Date() };
};

export default function App() {
  useLiveReload();
  let matches = useMatches();
  // If at least one route wants to hydrate, this will return true
  let includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {/* include the scripts, or not! */}
        {includeScripts && <Scripts />}
        <LiveReloadNoJs />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Oops!</title>
      </head>
      <body>
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
