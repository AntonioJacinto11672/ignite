import Header from "@components/Header";
import { Container, Form } from "./styles";
import Highliht from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import { Input } from "@components/Input/Index";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { HeaderList, NumberOfPlayers } from "@components/Filter/styles";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpity";
import { Button } from "@components/Button";


export default function Player() {
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Header showBackButton />
      <Highliht
        title="Nome da Turma"
        subTitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome da Pessoa"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={item => item}
          renderItem={({ item }) => <Filter isActive={item === team} title={item}
            onPress={() => setTeam(item)}
          />}

          horizontal
        />
        <NumberOfPlayers> {players.length} </NumberOfPlayers>

      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => <PlayerCard name={item} onRemove={() => { }}

        />}
        ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100},
          players.length === 0 && {flex: 1}
        ]}
      />

      <Button title="Remover Turma"  type="SECONDARY"/>
    </Container>
  );
}
