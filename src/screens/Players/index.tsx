import Header from "@components/Header";
import { Container, Form } from "./styles";
import Highliht from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import { Input } from "@components/Input/Index";
import { Filter } from "@components/Filter";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { HeaderList, NumberOfPlayers } from "@components/Filter/styles";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpity";
import { Button } from "@components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PlayerStorageDTO } from '@screens/Players/PlayerStorageDTO';
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@screens/Players/playAddByGroup";
import { playerGetByGroup } from "@screens/Players/playersGetByGroup";
import { PlayerGetByGroupAndTeam } from "@screens/Players/playerGetByGroupAndTeam";
import { PlayerRemoveByGroup } from './PlayerRemoveByGroup';
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string
}

export default function Player() {
  const [newPlayerName, setnewPlayerName] = useState<string>('')
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const navigation = useNavigation();

  const { group } = route.params as RouteParams


  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Nova Pessoa", "Informe o nome da pessoa para adicionar!")
    }
    const newPlayer = {
      name: newPlayerName,
      team
    }
    try {

      await playerAddByGroup(newPlayer, group)

      Keyboard.dismiss()
      setnewPlayerName('')
      fetchPlayersByTeam()
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert("Nova Pessoa", err.message)
      } else {
        console.log(err);
        Alert.alert("Nova Pessoa", "Não foi possivél adicionar")
      }

    }
  }


  async function fetchPlayersByTeam() {
    try {
      const playerByTeam = await PlayerGetByGroupAndTeam(group, team)
      setPlayers(playerByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert("Nova Pessoa", "Não foi possivél Carreegar as pessoas do time!")
    }
  }

  async function handlePlayerRenove(playerName: string) {
    try {
      await PlayerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Pessoa", "Não foi possivél remover essa pessoa")
    }

  }

  async function groupRemove(group: string) {
    try {
        await groupRemoveByName(group);
      navigation.navigate("group");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Turma", "Não foi possivél remover o groupo")
    }
  }
  async function handleGroupRemove() {
    try {
      Alert.alert("Remover Turma", `Deseja remover a turma ${group}?`, [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            // Call the function to remove the group
            await groupRemove(group);
            // Navigate back or perform any other action after removal
          }
        }
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Turma", "Não foi possivél remover a turma")
    }
  }
  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highliht
        title={group}
        subTitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input

          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setnewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={() => handleAddPlayer()} />
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => <PlayerCard name={item.name} onRemove={() => { handlePlayerRenove(item.name) }}

        />}
        ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button title="Remover Turma" type="SECONDARY" onPress={handleGroupRemove} />
    </Container>
  );
}
