import { Container, Brand, Menu, Search, Content, NewNote } from "./style";
import { useState, useEffect } from "react";
import {ButtonText} from "../../components/ButtonText"
import {FiPlus, FiSearch} from "react-icons/fi"
import { Input } from "../../components/Input"
import { Note } from "../../components/Notes"
import { Section } from "../../components/Section"
import { Header } from '../../components/Header';
import { api } from "../../services/api"; 
import { useNavigate } from "react-router-dom";

export function Home(){

    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName){

        if(tagName === "all"){
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName);

        if(alreadySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags)
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }

        setTagsSelected( prevState => [...prevState, tagName]);
    }

    function handleDetails(id){
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []); // useEffect que carrega as tags, nao depende de nenhum componente, é carregado quando a pagina carrega

    useEffect(() => {

        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
   

        }
        
        fetchNotes();

    }, [tagsSelected, search]) // esse useEffect esta dependendo dos estados da lista
    // no momento em que esses estados mudam, o useEffect é atualizado

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
                <li>
                    <ButtonText 
                        title = "Todos" 
                        onClick = {() => handleTagSelected("all")}
                        $isactive = {tagsSelected.length === 0} 
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key = {tag.id}>
                            <ButtonText 
                                title = {tag.name} 
                                onClick = {() => handleTagSelected(tag.name)} 
                                $isactive  = {tagsSelected.includes(tag.name)}  
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder = "pesquisar pelo titulo" 
                    icon={FiSearch}
                    onChange = {e => setSearch(e.target.value)} 
                />
            </Search>

            <Content>
                <Section title={"Minhas Notas"}>
                    {
                        notes.map(note => (

                            <Note 
                                key = {String(note.id)}
                                data = {note}
                                onClick = {() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to = "/new">
                <FiPlus />
                Criar Nota
            </NewNote>

        </Container>
    )

}