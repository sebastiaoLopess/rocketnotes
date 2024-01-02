import { Container } from './style';

export function ButtonText({title, isActive = false, ...rest}){

    return (
        <Container type='button' {...rest} $isactive = {isActive.toString()}>
            {title}
        </Container>
    );

}