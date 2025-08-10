import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLETION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerGetByGroup(group: string) {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLETION}-${group}`)

        const playes: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []


        return playes
    } catch (error) {
        throw error;
    }
}