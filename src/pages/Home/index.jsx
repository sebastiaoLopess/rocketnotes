import { Container, Brand, Menu, Search, Content, NewNote } from "./style";
import {ButtonText} from "../../components/ButtonText"
import {FiPlus, FiSearch} from "react-icons/fi"
import { Input } from "../../components/Input"
import { Note } from "../../components/Notes"
import { Section } from "../../components/Section"
import { Header } from '../../components/Header';

export function Home(){

    return (
        <Container>

            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header /> 

            <Menu>
                <li><ButtonText title = {"Todos"} isActive /></li>
                <li><ButtonText title = {"React"} /></li>
                <li><ButtonText title = {"NodeJS"} /></li>
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