import { Container, Content, Links } from "./styles";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";

export function Details(){

    return (
        <Container>
            <Header/>
            <main>
                <Content>
                    
                    <ButtonText title={"Excluir"}></ButtonText>

                    <h1>
                        Introdução ao React
                    </h1>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Consequuntur iure minus esse quos quod iusto officia provident 
                        totam eveniet amet accusantium rerum maxime, 
                        temporibus, quae ipsa itaque. Omnis, voluptate esse?
                    </p>

                    <Section title={"Links Úteis"}>
                        <Links>
                            <li><a href="#">link.com.br</a></li>
                            <li><a href="#">link.com.br</a></li>
                            <li><a href="#">link.com.br</a></li>
                        </Links>
                    </Section>

                    <Section title={"Marcadores"}>
                        <Tag title = {'express'}/>
                        <Tag title = {'nodejs'}/>
                    </Section>

                    <Button title={"Salvar"}/>
                </Content>
            </main>
        </Container>
    )

}