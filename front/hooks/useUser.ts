import { useContext } from "react";
import { UserContext } from "../context";

export default function useUser(){
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("O hook useUser deve ser chamado dentro do contexto delimitado por UserContext");
    }
    return context;
}