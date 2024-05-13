import { AlbumModel } from "@/models/AlbumModel";
import { AlbumModal } from "./AlbumModal";

type Props = {
    album: AlbumModel
}

export function CardAlbumList({ album }: Props) {
    return (
        <div style={{ '--bg-img': `url(${album.images[0].url})` } as React.CSSProperties} className="bg-[image:var(--bg-img)] bg-cover bg-no-repeat shadow-[#BDBDBD3B] shadow-lg w-[250px] h-[250px] rounded-md">
            <AlbumModal album={album} >
                <div className="flex flex-col h-full justify-between  backdrop-brightness-50 p-6 cursor-pointer">
                    <h1 className="text-2xl mt-16 font-semibold text-center text-white">{album.name}</h1>
                    <p className="self-end font-bold text-2xl ">R$ {album.value}</p>
                </div></AlbumModal>
        </div>
    )
}