import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    body,input,button, textarea{
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
        outline: none;
    }

    a{
        text-decoration: none;
    }

    button,a{
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover,a:hover{
        filter: brightness(0.9)
    }



`

// esse arquivo que vai aplicar os estilos CSS padrão para todos os arquivos
// colocamos nele apenas estilos que vão ser usados por todos os outros arquivos, nao nos aprofundamos nele
// ate por que ele sera usado somente para coisas básicas comuns a todos os outros componentes
// exportamos esse arquivo para que seja usado no main js