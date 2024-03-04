import { Container, Brand, Menu, Search, Content, NewNote } from "./style";
import { useState, useEffect } from "react";
import {ButtonText} from "../../components/ButtonText"
import {FiPlus, FiSearch} from "react-icons/fi"
import { Input } from "../../components/Input"
import { Note } from "../../components/Notes"
import { Section } from "../../components/Section"
import { Header } from '../../components/Header';
import { api } from "../../services/api"; 

export function Home(){

    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);

    // usando o useEffect para carregar os dados das tags que vem do banco de dados
    // o useEffect é carregado uma vez que a pagina é renderizada, pois nao colocamos uma dependencia de estado
    // criamos uma funcao dentro do useEffect para fazer a requisicao e retornar os dados que precisamos

    return (
        <Container>

            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header /> 

            <Menu>
                <li><ButtonText title = {"Todos"} isActive /></li>
                {
                    tags && tags.map(tag => (
                        <li key = {tag.id}>
                            <ButtonText title = {tag.name} />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input placeholder = "pesquisar pelo titulo" icon={FiSearch} />
            </Search>

            <Content>
                <Section title={"Minhas Notas"}>
                    <Note data = {
                        {
                            title: 'React',
                            tags: [
                                {id: "1", name: "react"},
                                {id: "2", name: "nodejs"},
                            ]
                        }
                    }/>
                </Section>
            </Content>

            <NewNote to = "/new">
                <FiPlus />
                Criar Nota
            </NewNote>

        </Container>
    )

}