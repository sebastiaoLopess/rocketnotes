import { Container,Form } from "./style";
import {FiArrowLeft,FiUser,FiMail,FiLock} from "react-icons/fi"
import {Input} from "../../components/Input"

export function Profile(){
    return(
        <Container>
            <header>
                <a href="/">
                    <FiArrowLeft />
                </a>
            </header>

            <Form>
                <Input 
                    placeholder = "Nome"
                    type = "text"
                    icon = {FiUser}
                />

                <Input 
                    placeholder = "Email"
                    type = "text"
                    icon = {FiMail}
                />

                <Input  
                    placeholder = "Senha atual"
                    type = "password"
                    icon = {FiLock}
                />

                <Input  
                    placeholder = "Nova Senha"
                    type = "password"
                    icon = {FiLock}
                />
            </Form>
        </Container>
    )
}