import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlbumModel } from "@/models/AlbumModel"
import { ReactNode } from "react"

type Props = {
    children?: ReactNode
    album: AlbumModel
}
export function Modal({ children, album }: Props) {
    return (
        <Dialog>
            <DialogTrigger className="w-full h-full">{children}</DialogTrigger>
            <DialogContent className="flex p-0 border-none h-[300px] ">
                <img className="w-[280px] h-full" src={album.images[0].url} alt="album capa" />
                <DialogHeader className="mt-9 mb-6 justify-between w-full">
                    <div className="flex flex-col gap-3">
                        <DialogTitle className="text-center text-2xl">{album.name}</DialogTitle>
                        <DialogDescription className="flex flex-col justify-center text-lg">
                            <p>Artista: {album.artists[0].name}</p>
                            <p>Lançamento: {album.releaseDate}</p>
                            <p>Tipo: {album.albumType}</p>
                            <p>Preço: {album.value} R$</p>
                        </DialogDescription>
                    </div>
                    <button className="self-center bg-[#FBBC05] text-2xl rounded-[40px] font-medium text-white px-20 py-1 max-w-64">Comprar</button>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}