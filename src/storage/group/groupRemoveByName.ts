import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLETION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupRemoveByName(groupDelete: string) {
    try {
        const storadGroup = await groupGetAll()
        
        const groups = storadGroup.filter(group => group !== groupDelete);
        

        await AsyncStorage.setItem(GROUP_COLLETION, JSON.stringify(groups));

        await AsyncStorage.removeItem(`${GROUP_COLLETION}-${groupDelete}`);
        
    } catch (error) {
        console.error('Failed to remove group:', error);
        throw error;
    }
}