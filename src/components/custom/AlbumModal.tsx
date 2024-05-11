import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlbumModel } from "@/models/AlbumModel"
import { AlbumSaleModel } from "@/models/AlbumSaleModel"
import { album_api } from "@/services/apiService"
import { ReactNode, useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {
    children?: ReactNode
    album: AlbumModel
}
export function AlbumModal({ children, album }: Props) {
    const [albums, setAlbums] = useState<AlbumSaleModel[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        requestMyAlbums();
    }, [])

    const albumRequest: AlbumSaleModel = {
        name: album.name,
        idSpotify: album.id,
        artistName: album.artists[0].name,
        imageUrl: album.images[0].url,
        value: album.value
    }
    function requestMyAlbums() {
        album_api.get("/albums/my-collection").then((resp) => {
            setAlbums(resp.data);
        }).catch((error) => console.log(error))
    }
    function handleBuyAlbum() {
        if (!albumAlreadyExists()) {
            setIsLoading(true);
            album_api.post("/albums/sale", albumRequest)
                .then(() => {
                    toast.success("Album comprado");
                    requestMyAlbums();
                    setIsLoading(false);
                }).catch(() => {
                    toast.error("Falha ao comprar album");
                    setIsLoading(false);
                })
        }
        else{
            toast.error("Album ja comprado");
            setIsLoading(false);
        }
            
    }

    function albumAlreadyExists() {
        return albums.filter(((alb) => {
            return alb.idSpotify === albumRequest.idSpotify
        })).length > 0;
    }

    return (
        <Dialog>
            <DialogTrigger className="w-full h-full">{children}</DialogTrigger>
            <DialogContent className="flex p-0 border-none h-[300px] ">
                <img className="w-[280px] h-full" src={album.images[0].url} alt="album capa" />
                <DialogHeader className="mt-9 mb-6 justify-between w-full">
                    <div className="flex flex-col gap-3">
                        <DialogTitle className="text-center text-2xl pr-3">{album.name}</DialogTitle>
                        <div className="flex flex-col justify-center font-light text-lg">
                            <p>Artista: {album.artists[0].name}</p>
                            <p>Lançamento: {album.releaseDate}</p>
                            <p>Tipo: {album.albumType}</p>
                            <p>Preço: {album.value} R$</p>
                        </div>
                    </div>
                    {
                        isLoading ? <button disabled className="self-center bg-black text-2xl rounded-[40px] font-medium text-white px-20 py-1 max-w-64">Comprar</button>
                        : <button onClick={handleBuyAlbum} className="self-center bg-[#FBBC05] text-2xl rounded-[40px] font-medium text-white px-20 py-1 max-w-64 transition duration-400">Comprar</button>

                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}