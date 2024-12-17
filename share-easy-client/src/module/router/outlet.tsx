import React, { createContext, useContext, useEffect, useReducer } from "react";
import { RoutesCtx } from "./router";

const navigationCtx = createContext<(path: string) => void>(() => {});

export function Outlet() {
  const routes = useContext(RoutesCtx);
  const [count, rerender] = useReducer((p) => ++p, 0);

  function navigate(path: string) {
    history.pushState(null, "", path);
    rerender();
  }

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

  useEffect(() => {
    window.addEventListener("popstate", rerender);
    return () => window.removeEventListener("popstate", rerender);
  });

  return (
    <navigationCtx.Provider key={count} value={navigate}>
      <route.component />
    </navigationCtx.Provider>
  );
}

export const useNavigate = () => useContext(navigationCtx);
