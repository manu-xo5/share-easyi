import React, { useContext } from "react";
import { RoutesCtx } from "./router";

interface RouteProps {
  children: JSX.Element;
  exact?: boolean;
  path: string;
}
// const fallbackRoute: Route = { component: App, test: ".*" };

export function Route({ children, exact = false, path }: RouteProps) {
  const routes = useContext(RoutesCtx);
  routes.push({
    exact,
    test: path,
    component: () => children,
  });

  return <></>;
}
