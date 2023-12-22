import { Container ,Profile, Logout} from "./style";
import { RiShutDownLine} from "react-icons/ri"

export function Header(){

    return(
        <Container>
            <Profile>
                <img src="https://github.com/sebastiaoLopess.png" alt="foto do usuario" />
                <div>
                    <span>Bem vindo</span>
                    <strong>Sebastiao Lopes</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine />
            </Logout>
        </Container>
    )

}