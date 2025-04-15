import { NavigationState, NavigationAction } from "@react-navigation/native";

declare module "@react-navigation/native" {
  export interface NavigationProp<
    ParamList extends Record<string, object | undefined>,
    RouteName extends keyof ParamList = string,
  > {
    navigate<RouteName extends keyof ParamList>(
      ...args: ParamList[RouteName] extends undefined
        ? [RouteName]
        : [RouteName, ParamList[RouteName]]
    ): void;
    goBack(): void;
    setParams(params: Partial<ParamList[RouteName]>): void;
    dispatch(action: NavigationAction): void;
    isFocused(): boolean;
    canGoBack(): boolean;
    getId(): string | undefined;
    getState(): NavigationState;
  }
}
