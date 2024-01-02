import {Container} from "./style";

export function Section({title,children}) {
    return (
        <Container>
            <h2>{title}</h2>
            {children}
        </Container>
    )
}

// o children pode receber um bloco de codigo com tags html