import { createContext, useContext } from "react";

type Route = {
  test: string;
  exact: boolean;
  component: () => JSX.Element;
};

export const RoutesCtx = createContext<Route[]>([]);
