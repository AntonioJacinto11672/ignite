import { Container } from './styles';
import Header from '@components/Header';
import Highliht from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpity';
import { Button } from '@components/Button';

export function Groups() {
    const [groups, setGroups] = useState<string[]>([]);
    return (
        <Container>
            <Header />
            <Highliht title="Turmas" subTitle="Jogue com a sua turma" />

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                renderItem={({ item }) => <GroupCard title={item} />}
                ListEmptyComponent={() => <ListEmpty  message="Que tal Cadastrar a primeira turma?"/>}
                />

                <Button title='Criar nova  turma' />
            
        </Container>
    );
}
