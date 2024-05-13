import { AlbumSaleModel } from "@/models/AlbumSaleModel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ReactNode } from "react";

type Props = {
    album: AlbumSaleModel
    children: ReactNode
}

export function MyAlbumCard({ album, children }: Props) {
    return (
        <Dialog>
            <DialogTrigger className="">{children}</DialogTrigger>
            <DialogContent className="flex p-0 border-none h-[fit] ">
                <img className="w-[280px] h-full" src={album.imageUrl} alt="album capa" />
                <DialogHeader className="mt-9 mb-6 justify-between w-full">
                    <div className="flex flex-col gap-3">
                        <DialogTitle className="text-center text-2xl pr-3">{album.name}</DialogTitle>
                        <div className="flex flex-col justify-center font-light text-lg">
                            <p>Artista: {album.artistName}</p>
                            <p>ID Spotify: {album.idSpotify}</p>
                            <p>Preço: {album.value} R$</p>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}