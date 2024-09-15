"use client"

import { useMountedState } from "react-use"

import AddUserSheet from "@/components/user/add-user-sheet"
import EditUserSheet from "@/components/user/edit-user-sheet"

const SheetProvider = () => {
    const isMounted = useMountedState()
    if(!isMounted) return null
    return (
        <>
            <AddUserSheet />
            <EditUserSheet />
        </>
    )
}

export default SheetProvider