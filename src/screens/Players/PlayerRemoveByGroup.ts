import AsyncStorage from "@react-native-async-storage/async-storage";
import { playerGetByGroup } from "./playersGetByGroup";
import { PLAYER_COLLETION } from "@storage/storageConfig";

export async function PlayerRemoveByGroup(playerName: string, group: string) {
    try {
        const storage = await playerGetByGroup(group);

        const filtered = storage.filter(player => player.name !== playerName);
        const players = JSON.stringify(filtered);

        await AsyncStorage.setItem(`${PLAYER_COLLETION}-${group}`, players);
 
    } catch (error) {
        console.error('Failed to remove player:', error);
        throw error;
    }

}