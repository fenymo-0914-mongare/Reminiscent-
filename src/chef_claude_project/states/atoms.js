import { atom } from "jotai"
export const ingredientsAtom = atom([])
export const recipeAtom = atom(null)
export const loadingAtom = atom(false)
export const errorAtom = atom(null)