import { Container } from './styles';
import Header from '@components/Header';
import Highliht from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpity';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupGetAll } from '@storage/group/groupGetAll';
import Loading from '@components/Loanding';



export function Groups() {
      const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation()

    const handleNewGroup = () => {
        navigation.navigate("new")
    }

    async function fetchGroups() {
        try {
            setIsLoading(true);
            const data = await groupGetAll()
            setGroups(data)
           
        } catch (error) {
            console.log(error);
            Alert.alert("Turmas", "Não foi possível carregar as turmas")
        } finally {
             setIsLoading(false);
        }
    }

    async function handleOpenGroup(group: string) {
        navigation.navigate("players", { group })
    }
    useFocusEffect(useCallback(() => {
        fetchGroups()
    }, []))
    return (
        <Container>
            <Header />
            <Highliht title="Turmas" subTitle="Jogue com a sua turma" />

            {
                isLoading ?
                <Loading /> :
                <FlatList
                data={groups}
                keyExtractor={(item) => item}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
                ListEmptyComponent={() => <ListEmpty message="Que tal Cadastrar a primeira turma?" />}
                showsVerticalScrollIndicator={false}
            />

            }
            <Button title='Criar nova  turma' onPress={handleNewGroup} />

        </Container>
    );
}
