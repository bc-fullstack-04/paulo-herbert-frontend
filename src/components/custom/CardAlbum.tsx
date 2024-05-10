import { AlbumModel } from "@/models/AlbumModel"
import { Modal } from "./Modal";

type Props={
    album:AlbumModel,
    onClick?:React.MouseEventHandler<HTMLDivElement>;
}

export function CardAlbum({album,onClick}:Props) {
    return (
        <>
            <Modal album={album}>
                <div style={{ '--bg-img': `url(${album.images[0].url})` } as React.CSSProperties} className="bg-[image:var(--bg-img)] bg-cover bg-no-repeat h-64 rounded-md">
                <div onClick={onClick} className="flex gap-5 flex-col h-full justify-between backdrop-brightness-50 p-6 cursor-pointer">
                    <h1 className="text-2xl mt-16 font-semibold  text-center text-white">{album.name}</h1>
                    <p className="self-end font-bold text-2xl ">R$ {album.value}</p>
                </div>
            </div>
            </Modal>
            
        </>
    )
}