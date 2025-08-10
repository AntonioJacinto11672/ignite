import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLETION } from "@storage/storageConfig";
import { playerGetByGroup } from "./playersGetByGroup";
import { AppError } from "@utils/AppError";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {

        const storedPlayers = await playerGetByGroup(group)

        const playerAlreadExitis = storedPlayers.filter((player) =>
            player.name === newPlayer.name
        )

        if (playerAlreadExitis.length > 0) {
            throw new AppError("Essa pessoa já está cadastrada em um time aqui!")
            
        }



        const storage = JSON.stringify([...storedPlayers, newPlayer])
        await AsyncStorage.setItem(`${PLAYER_COLLETION}-${group}`, storage)
    } catch (error) {
        throw (error)
    }
}