import { SetStateAction } from "react";

export type ModeType = "dark" | "light"

export interface ThemeProviderType {
    toggle: VoidFunction,
    mode: ModeType
}