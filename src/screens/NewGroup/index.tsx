import Header from "@components/Header";
import { Container, Content, Icon } from "./styles";
import Highliht from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input/Index";

export function NewGroup() {
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
                />
                <Button title="Criar" />
            </Content>
        </Container>
    )
}