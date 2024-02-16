import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import {useAuth} from "../hooks/auth";

export function Routes(){

    const {user} = useAuth(); // compartilhando os dados do usuario atraves de contexto com hook de autenticacao
    

    return(
        <BrowserRouter>
            {user ? <AppRoutes /> : <AuthRoutes/>}
        </BrowserRouter>
    )
}