import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLETION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName:string) {
    try {

        const storedGroup = await groupGetAll()

        const groupAlreadyExists  = storedGroup.includes(newGroupName)

        if (groupAlreadyExists) {
            throw new AppError("Já existe um groupo Cadastrado com esse nome.")
        }
        
        const storage = JSON.stringify([...storedGroup, newGroupName])
        await AsyncStorage.setItem(GROUP_COLLETION, storage)

    } catch (error) {
        throw error;
    }
}