import { Item } from "./item";

export interface Category {
    categoryName: string;
    items?: Item[];
}