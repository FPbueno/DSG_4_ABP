declare module "*/screens/Home" {
  import { FC } from "react";
  import { StackNavigationProp } from "@react-navigation/stack";

  type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Recuperacao: undefined;
    MainStack: undefined;
  };

  type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "MainStack"
  >;

  interface Props {
    navigation: HomeScreenNavigationProp;
  }

  const HomeScreen: FC<Props>;
  export default HomeScreen;
}

declare module "*/screens/Recuperacao" {
  import { FC } from "react";
  import { StackNavigationProp } from "@react-navigation/stack";

  type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Recuperacao: undefined;
    MainStack: undefined;
  };

  type RecuperacaoScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Recuperacao"
  >;

  interface Props {
    navigation: RecuperacaoScreenNavigationProp;
  }

  const Recuperacao: FC<Props>;
  export default Recuperacao;
}
