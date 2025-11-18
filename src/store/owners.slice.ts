import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { } from '@redux-devtools/extension' // required for devtools typing
import { EditTermOwnerI } from '@/interfaces'

interface TermOwnerStoreI {
    termOwnerList: EditTermOwnerI[] | null
    setTermOwnerList: (termOwner: EditTermOwnerI[]) => void
    isLogin: null | { username: string, token: string }
    setIsLogin: (isLogin: { username: string, token: string } | null) => void
    fetch: () => Promise<void>
}

const uri = 'https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary'

export const useStore = create<TermOwnerStoreI>()(
    devtools(
        persist(
            (set) => ({
                termOwnerList: null,
                setTermOwnerList: (termOwner: EditTermOwnerI[]) => set({ termOwnerList: termOwner }),
                isLogin: null,
                setIsLogin: (val: { username: string, token: string } | null) => set({ isLogin: val }),
                fetch: async () => {
                    const response = await fetch(uri)
                    const { data } = await response.json()
                    set({ termOwnerList: data || [] })
                }
            }),
            {
                name: 'termOwnerStore'
            }
        )
    )
)