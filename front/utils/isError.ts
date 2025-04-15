import { ErrorProps } from "../types";

// Os objetos recebidos do servidor que são mensagens de erro possuem a estrutura {error:""}
export const isErrorProps = (object: any): object is ErrorProps => "error" in object;