import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./styles";
import logoImg from '@assets/logo.png';

type Props = {
    showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: Props) {
    const navigation = useNavigation()
    function handleGoback() {
        navigation.navigate("group")
    }
    return (
        <Container>
            {
                showBackButton &&
                <BackButton onPress={handleGoback}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg} />
        </Container>
    );

}