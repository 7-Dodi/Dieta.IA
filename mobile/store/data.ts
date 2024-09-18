import {create} from "zustand";

export type User = {
    name: string,
    weight: string,
    age: string,
    height: string,
    gender: string,
    objective: string, 
	level: string,
}

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, "gender" | "objective" | "level">)=> void;
    setPageTwo: (data: Pick<User, "gender" | "objective" | "level">)=> void;
}

export const useDateStore = create<DataState>((set) => ({
    user: {
        name: "",
        age: "",
        gender: "",
        height: "",
        level: "",
        objective: "",
        weight: "",
    },
    setPageOne: (data)=> set((state) => ({user: {...state.user, ...data}})),
    setPageTwo: (data)=> set((state) => ({user: {...state.user, ...data}})),
}))