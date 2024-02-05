import { useState } from "react";
import { Container,Form, Background } from "./style";
import { Input } from "../../components/Input";
import { FiLogIn, FiMail, FiLock, FiUser} from "react-icons/fi";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api"

export function SignUp() {
    const [name, setName] = useState(""); //criando um estado de uma determinada variavel, set altera o conteudo dela
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = new useNavigate(); // usado para voltar para uma pagina

    function handleSignUp(){
        if (!name || !email || !password) {
            return alert("Preencha todos os campos");
        }

        api.post("/users", {name,email,password})
            .then(() => {
                alert("usuario cadastrado com sucesso");
                navigate("/");
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data.message);
                }else{
                    alert("Nao foi possivel cadastrar");
                }
            });
    }
    return (
        <Container>
            <Background></Background>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Crie sua conta</h2>

                <Input
                    placeholder = "Nome"
                    type = "text"
                    icon = {FiUser} 
                    onChange = {e => setName(e.target.value)} //capturando o conteudo do input e setando na variavel
                />

                <Input
                    placeholder = "Email"
                    type = "text"
                    icon = {FiMail}
                    onChange = {e => setEmail(e.target.value)}
                />

                <Input
                    placeholder = "Senha"
                    type = "password"
                    icon = {FiLock}
                    onChange = {e => setPassword(e.target.value)}
                />

                <Button title = "Cadastrar" onClick = {handleSignUp}/>

                <Link to = "/">
                    Voltar para o login
                </Link>
            </Form>

        </Container>
    )
}