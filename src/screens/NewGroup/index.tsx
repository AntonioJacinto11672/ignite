import Header from "@components/Header";
import { Container, Content, Icon } from "./styles";
import Highliht from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input/Index";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
    const [group, setGroup] = useState('')
    const navigation = useNavigation()

    async function handleNew() {
        try {

            if(group.trim().length === 0) {
                return Alert.alert("Novo Grupo", "Informe o nome da turma")
            }
            await groupCreate(group)
            navigation.navigate("players", { group })
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Novo Grupo", error.message)
            } else {
                Alert.alert("Novo Grupo", "Não foi Possível criar novo grupo!")
            }

                console.log(error)
        }
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