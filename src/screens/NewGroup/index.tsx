import Header from "@components/Header";
import { Container, Content, Icon } from "./styles";
import Highliht from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input/Index";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup() {
    const [group, setGroup] = useState('')
    const navigation = useNavigation()

    function handleNew() {
        navigation.navigate("players", { group })
    }
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highliht
                    title="Nova Turma"
                    subTitle="Crie a turma para adicionar as pesssoas" />

                <Input
                    style={{ marginBottom: 24 }}
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />
                <Button title="Criar" onPress={handleNew} />
            </Content>
        </Container>
    )
}