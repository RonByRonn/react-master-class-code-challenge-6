import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
	"TO_DO" = "To do",
	"DOING" = "Doing",
	"DONE" = "Done",
}

export interface IToDo {
	text: string;
	id: number;
	category: Categories;
}

const { persistAtom } = recoilPersist();

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TO_DO,
	effects_UNSTABLE: [persistAtom],
});

export const categoriesState = atom<Categories[]>({
	key: "categories",
	default: [Categories.TO_DO, Categories.DOING, Categories.DONE],
	effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		return toDos.filter((toDo) => toDo.category === category);
	},
});
