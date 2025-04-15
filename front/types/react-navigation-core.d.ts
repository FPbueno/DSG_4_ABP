import { NavigationState, NavigationAction } from "@react-navigation/native";

declare module "@react-navigation/core" {
  export interface NavigationState {
    routes: Array<{
      key: string;
      name: string;
      params?: object;
    }>;
    index: number;
    routeNames: string[];
    type: string;
    stale: boolean;
  }

  export interface NavigationAction {
    type: string;
    payload?: object;
    source?: string;
    target?: string;
  }
}
