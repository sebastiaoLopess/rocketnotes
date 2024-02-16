import { createContext,useContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [data,setData] = useState("");
    

    async function signIn({email,password}){

        try{
            const response = await api.post("/sessions",{email,password});
            const {user, token} = response.data; // capturando usuario e token
            
            api.defaults.headers.authorization = `Bearer ${token}`; // gravando o token de autenticavao com header
            setData({user,token}) // armazenando os dados do usuario e token em uma variavel

        }catch(error){
            if(error.response){
                alert(error.response.data.message);
            }else{
                alert("Nao foi possivel entrar");
            }
        }
    } // dentro de um hook temos a chamada dessa funcao que faz uma requisicao ao backend para autenticar o usuario

    // compartilhamos a funcao signIn dentro do AuthContexto com o value
    return(

        <AuthContext.Provider value={{signIn,user: data.user}}> 
            {children} 
        </AuthContext.Provider>

    )
} // funcao para prover o acesso ao contexto para as rotas

function useAuth(){
    const context = useContext(AuthContext);
    return context;
} // funcao do contexto que sera compartilhado entre as paginas

export {AuthProvider,useAuth};

// hook do contexto que será usado para aplicar o conceito de contexto na aplicacao