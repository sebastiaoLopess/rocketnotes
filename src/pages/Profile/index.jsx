import { useState} from 'react'
import { Container,Form,Avatar } from "./style";
import {FiArrowLeft,FiUser,FiMail,FiLock, FiCamera} from "react-icons/fi"
import {Input} from "../../components/Input"
import {Button} from "../../components/Button"
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { Link } from "react-router-dom";
import { useAuth } from '../../hooks/auth';
import { api } from "../../services/api";
import { ButtonText } from "../../components/ButtonText"
import { useNavigate } from "react-router-dom"

export function Profile(){

  
    const navigate = useNavigate();
    const { user,updateProfile } = useAuth();
    
    const [name,setName] = useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [passwordOld,setPasswordOld] = useState();
    const [passwordNew,setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);


    function handleBack() {
        navigate(-1);
    }



    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

       const userUpdated = Object.assign(user,updated);

        await updateProfile({user: userUpdated,avatarFile});
    }



    async function handleChangeAvatar(event){
        const file = event.target.files[0];

        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);

    }

    return(
        <Container>
            <header>
                <ButtonText title = "Voltar" onClick = {handleBack} />
                
            </header>

            <Avatar>
                <img src= {avatar} alt="" />

                <label htmlFor="avatar">
                    <FiCamera />
                    <input type="file" id="avatar" onChange = {handleChangeAvatar} />
                </label>
            </Avatar>

            <Form>
                <Input 
                    placeholder = "Nome"
                    type = "text"
                    icon = {FiUser}
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                />

                <Input 
                    placeholder = "Email"
                    type = "text"
                    icon = {FiMail}
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                />

                <Input  
                    placeholder = "Senha atual"
                    type = "password"
                    icon = {FiLock}
                    onChange = {e => setPasswordOld(e.target.value)}
                />

                <Input  
                    placeholder = "Nova Senha"
                    type = "password"
                    icon = {FiLock}
                    onChange = {e => setPasswordNew(e.target.value)}
                />

                <Button title = "Salvar" onClick = {handleUpdate} />
            </Form>


        </Container>
    )
}