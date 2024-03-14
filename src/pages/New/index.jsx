import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {Container,Form} from "./style"
import {Header} from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { ButtonText } from "../../components/ButtonText"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { Link } from "react-router-dom";
import {api} from "../../services/api"

export function New(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    // criando dois estado para adicionar e mostrar links
    // o primeiro estado é um array que vai comportar todos os links
    // o segundo array é o estado que vai armazenar o novo link a ser adicionado na lista de links

    const [tags, setTags] = useState([]);
    const [newTag, setnewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");

        // essa é a funcao que adiciona um link a lista de links
        // ele pega o new link e adiciona no estado setlinks, despejando o que ja tinha no array links
        // e o novo é adicionado com os antigos criando um novo array com o ...prevstate
    }

    function handleBack() {
        navigate(-1);
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link!== deleted))

        // para remover um link basta adicionar na lista de links todos os links que ja existiam
        // menos o link que esta sendo excluido
        // usamos a funcao filter para fazer isso
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]);
        setnewTag("");
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag!== deleted))
    }

    async function handleNewNote(){

        if (!title){
            return alert("Digite o titulo da nota para continuar");
        } // verificando se o usuario digitou o titulo da nota

        
        if(newLink){
            return alert("Voce deixou uma link no campo para adicionar, mas não adicionou. Adicione para continuar ou apague");
        }
        
        if(newTag){
            return alert("Voce deixou uma tag no campo para adicionar, mas não adicionou. Adicione para continuar ou apague");
        } // verificando se o usuario esqueceu de adicionar uma tag com um texto no campo de adicionar


        await api.post("/notes",{
            title,
            description,
            tags,
            links
        })

        alert("Nota cadastrada com sucesso!");
        navigate("/");
    }

    return (
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText title = "Voltar" onClick = {handleBack} />
                    </header>

                    <Input 
                        placeholder = "Titulo"
                        onChange = {e => setTitle(e.target.value)}
                    />
                    <Textarea 
                        placeholder = "Observacoes" 
                        onChange = {e => setDescription(e.target.value)}
                    />

                    <Section title={"Links Uteis"}>

                        {
                            links.map((link,index) => (
                                <NoteItem
                                    key = {String(index)} 
                                    value={link}
                                    onClick={() => handleRemoveLink(link)} 
                                />
                            ))
                        }

                        <NoteItem 
                            isNew 
                            placeholder = "Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink} 
                        />
                    </Section>

                    <Section title = "Marcadores" >
                        <div className = "tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key = {String(index)}
                                        value= {tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew 
                                placeholder = "Nova tag" 
                                onChange = {e => setnewTag(e.target.value)}
                                value = {newTag}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button 
                        title = "Salvar"
                        onClick = {handleNewNote}
                    />

                </Form>
            </main>
        </Container>
    )
}