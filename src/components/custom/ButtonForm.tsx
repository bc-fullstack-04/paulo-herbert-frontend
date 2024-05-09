import { ReactNode } from "react"

type Props={
    children?:ReactNode
    disabled?:boolean
}
export function ButtonForm({children,disabled}:Props){
    return (
        <>
        <button type='submit' disabled={disabled} className="p-3 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-3">{children}</button>
        </>
    )
}