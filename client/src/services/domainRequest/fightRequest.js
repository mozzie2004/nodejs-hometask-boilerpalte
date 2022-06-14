import { get, post } from "../requestHelper";

const entity = 'fights';

export const getFightHistory = async () => {
    return await get(entity);
}

export const addFightToHistory = async (body) => {
    return await post(entity, body);
}