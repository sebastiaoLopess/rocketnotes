import { useState } from "react";
import { Container,Form, Background } from "./style";
import { Input } from "../../components/Input";
import { FiLogIn, FiMail, FiLock} from "react-icons/fi"
import { Button } from "../../components/Button"
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const {signIn} = useAuth(); // trazendo a funcao signIn do hook de autenticacao

    function handleSignIn(){
        signIn({email,password})
    } // criando uma funcao para executar a funcao signIn carregada do contexto
    return (
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Faça seu login</h2>

                <Input
                    placeholder = "Email"
                    type = "text"
                    icon = {FiMail}
                    onChange = {e => setEmail(e.target.value)} // capturando o email digitado no input atraves de useState
                />

                <Input
                    placeholder = "Senha"
                    type = "password"
                    icon = {FiLock}
                    onChange = {e => setPassword(e.target.value)} // capturando o password digitado no input atraves de useState
                />
                
                <Button title = "Entrar" onClick={handleSignIn}/> 

                <Link to = "/register">
                    Criar Conta
                </Link>
            </Form>

            <Background></Background>
        </Container>
    )
}