import { Header } from "@/components/custom/Header";
import { AlbumSaleModel } from "@/models/AlbumSaleModel";
import { album_api } from "@/services/apiService";
import { useEffect, useState } from "react";
import albumIcon from "../../assets/albumsIcon.svg"
import moneyIcon from "../../assets/moneyicon.svg"
import { MyAlbumCard } from "@/components/custom/MyAlbumCard";

export function MyAlbums() {
    const [albums, setAlbums] = useState<AlbumSaleModel[]>([]);
    const [totalState, setTotalState] = useState(0);

    useEffect(() => {
        album_api.get("/albums/my-collection")
            .then((resp) => {
                setAlbums(resp.data);
            })
            .catch((error) => console.log(error));
    }, [])

    useEffect(() => {
        const total = albums.reduce((acc, alb) => acc + alb.value, 0);
        setTotalState(total);
    }, [albums])

    return (
        <main className="bg-[#19181F] h-screen flex flex-col gap-48">
            <Header />
            <div className="h-fit text-black flex flex-col gap-10 px-24 ">
                <h1 className="text-white text-5xl">Meus Discos</h1>
                <div className="flex gap-5 ">
                    <div className="bg-white justify-center gap-4 p-3 rounded-xl flex w-56">
                        <img src={albumIcon} alt="icon" />
                        <div className="flex flex-col">
                            <p className="font-semibold">Total de albums</p>
                            <p className="text-2xl">{albums.length}</p>
                        </div>
                    </div>
                    <div className="bg-white justify-center  flex p-3 rounded-xl gap-4 w-56 ">
                        <img src={moneyIcon} alt="icon" />
                        <div className="flex flex-col">
                            <p className="font-semibold">Valor Investido</p>
                            <p className="text-2xl">R${totalState.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="w-fit flex gap-4 flex-wrap">
                    {albums.slice(0, 14).map((album) => (
                        <MyAlbumCard key={album.id} album={album} >
                            <div style={{ '--bg-img': `url(${album.imageUrl})` } as React.CSSProperties} className="bg-[image:var(--bg-img)] bg-cover bg-no-repeat h-[200px] shadow-[#BDBDBD3B] shadow-lg w-[200px] rounded-md">
                                <div className="flex flex-col h-full justify-center backdrop-brightness-50 p-6 cursor-pointer">
                                    <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                                </div>
                            </div>
                        </MyAlbumCard>
                    ))}
                </div>
            </div>
        </main>
    )
}