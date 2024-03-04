import { createContext,useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [data,setData] = useState("");
    

    async function signIn({email,password}){

        try{
            const response = await api.post("/sessions",{email,password});
            const {user, token} = response.data; // capturando usuario e token

            localStorage.setItem("@rocketnotes:user",JSON.stringify(user)); 
            localStorage.setItem("@rocketnotes:token",token); // salvando dados no local storage
            
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // gravando o token de autenticavao com header
            setData({user,token}) // armazenando os dados do usuario e token em uma variavel

        }catch(error){
            if(error.response){
                alert(error.response.data.message);
            }else{
                alert("Nao foi possivel entrar");
            }
        }
    } // dentro de um hook temos a chamada dessa funcao que faz uma requisicao ao backend para autenticar o usuario

    async function signOut(){
        localStorage.removeItem("@rocketnotes:token");
        localStorage.removeItem("@rocketnotes:user");

        setData({});
    }

    async function updateProfile({ user, avatarFile }){

        try{

            if(avatarFile){
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar",avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }
           
            await api.put("users",user);
            localStorage.setItem("@rocketnotes:user",JSON.stringify(user));

            setData({ user, token:data.token });
            alert("Perfil atualizado!");

        }catch(error){
            if(error.response){
                alert(error.response.data.message);
            }else{
                alert("Nao foi possivel entrar");
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token");
        const user = localStorage.getItem("@rocketnotes:user");

        if (token && user){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token,
                user: JSON.parse(user)
            });
        }
    },[]); // usando o useEffect para sempre que o componente ou a pagina atualizar, ele atualizar o estado gravando token

    // compartilhamos a funcao signIn dentro do AuthContexto com o value
    return(

        <AuthContext.Provider value={{signIn,signOut,updateProfile,user: data.user}}> 
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