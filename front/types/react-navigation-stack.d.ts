import { NavigationProp } from "@react-navigation/native";

declare module "@react-navigation/stack" {
  export interface StackNavigationProp<
    ParamList extends Record<string, object | undefined>,
    RouteName extends keyof ParamList = string,
  > extends NavigationProp<ParamList, RouteName> {
    push<RouteName extends keyof ParamList>(
      ...args: ParamList[RouteName] extends undefined
        ? [RouteName]
        : [RouteName, ParamList[RouteName]]
    ): void;
    pop(count?: number): void;
    popToTop(): void;
  }
}
