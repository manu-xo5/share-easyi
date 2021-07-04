import React, { useContext } from "react";
import { RoutesCtx } from "./router";

export function Outlet() {
  const routes = useContext(RoutesCtx);
  const route = routes.find((route) => {
    const matches = new RegExp(route.test + "\\w*").exec(location.pathname);

    // if route doesn't matches
    if (matches == null) {
      return false;
    }

    // if route has to be exact
    if (route.exact) {
      return matches.toString() === route.test;
    }

    // match found and doesn't need tobe exact, return true
    return true;
  });

  if (!route) {
    console.warn('Consider adding a <Route path=".*" /> for 404 pages');
    return <p>"404"</p>;
  }

  return <route.component />;
}
