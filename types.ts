import { SetStateAction } from "react";

export type ModeType = "dark" | "light"

export interface ThemeProviderType {
    toggle: VoidFunction,
    mode: ModeType
}

export type PostType = {
    _id: string,
    title: string,
    desc: string,
    img: string,
    content: string,
    userName: string,
}