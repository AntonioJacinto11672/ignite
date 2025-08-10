import { playerGetByGroup } from "./playersGetByGroup";

export async function PlayerGetByGroupAndTeam(group:string, team: string) {
    const storage = await playerGetByGroup(group)

    const players = storage.filter(player => player.team === team)


    return players
}