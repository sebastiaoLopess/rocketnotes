import { Container,Form,Avatar } from "./style";
import {FiArrowLeft,FiUser,FiMail,FiLock, FiCamera} from "react-icons/fi"
import {Input} from "../../components/Input"
import { Link } from "react-router-dom";

export function Profile(){
    return(
        <Container>
            <header>
                <Link to = "/">
                    <FiArrowLeft />
                </Link>
                
            </header>

            <Avatar>
                <img src="https://github.com/sebastiaoLopess.png" alt="" />

                <label htmlFor="avatar">
                    <FiCamera />
                    <input type="file" id="avatar" />
                </label>
            </Avatar>

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