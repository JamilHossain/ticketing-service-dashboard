import { create } from 'zustand'

type NewUserState = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const addUser = create<NewUserState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))