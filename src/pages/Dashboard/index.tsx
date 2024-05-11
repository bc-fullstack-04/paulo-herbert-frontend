import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg"
import icon from "../../assets/user.png"
import lupa from "../../assets/lupa.svg"

import { ChangeEvent, useEffect, useState } from "react";
import { album_api } from "@/services/apiService";
import { AlbumModel } from "@/models/AlbumModel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import { CardAlbum } from "@/components/custom/CardAlbum";
import { AlbumModal } from "@/components/custom/AlbumModal";


export function Dashboard() {
    const [initialData, setInitialData] = useState<AlbumModel[]>([]);
    const [data, setData] = useState<AlbumModel[]>([]);
    const [input, setInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    useEffect(() => {
        album_api.get("/albums/all?searchText=Turma do Pagode")
            .then((resp) => { setData(resp.data); setInitialData(resp.data) })
            .catch((error) => console.log(error))
    }, [])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setInput(value);
        if (value.length===0) {
            setIsSearching(false);
            setData(initialData);    
        }   
    }

    function searchAlbum() {
        console.log(input);
        album_api.get("/albums/all?searchText=" + input)
            .then((resp) => { setData(resp.data); setIsSearching(true); })
            .catch((error) => console.log(error))
    }
    return (
        <main className="flex flex-col bg-no-repeat bg-cover bg-dash text-white">
            <header className="px-[150px] py-3 flex items-center justify-between text-white bg-white backdrop-blur-lg bg-opacity-25">
                <div className='text-white flex gap-2 items-center'>
                    <img src={logo} alt="logo" />
                    <p>BootPlay</p>
                </div>
                <div className="flex items-center gap-10">
                    <NavLink to={"/albums"}>Meus discos</NavLink>
                    <NavLink to={"/wallet"}>Carteira</NavLink>
                    <img className="w-[50px] h-[50px]" src={icon} alt="icon" />
                </div>
            </header>
            <div className="backdrop-brightness-50 h-[60vh]">
                <div className="mt-[300px] w-[550px] ml-8 flex flex-col">
                    <h1 className="font-semibold text-[40px] text-balance">A história da música não pode ser esquecida!</h1>
                    <p className="text-[24px]">Sucessos que marcaram o tempo!!!</p>
                </div>
            </div>
            {/* Trends + Area de Pesquisa  */}
            <section className="bg-[#19181F]  h-full w-full flex flex-col items-center ">
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    searchAlbum();
                }} className="flex px-3 mt-5 justify-between border rounded-md border-white max-w-[448px] w-[448px] h-[50px]">
                    <input type="text" onChange={handleInputChange} className="bg-transparent w-full outline-none" />
                    <img className="cursor-pointer" onClick={searchAlbum} src={lupa} alt="lupa" />
                </form>
                {isSearching ?
                    <div className="px-5 my-8 w-full flex justify-center flex-wrap text-balance gap-5">  {/* Results / */}
                        {data.slice(0, 10).map((album, i) => (
                            <div key={i} style={{ '--bg-img': `url(${album.images[0].url})` } as React.CSSProperties} className="bg-[image:var(--bg-img)] bg-cover bg-no-repeat w-[250px] h-[250px] rounded-md">
                                <AlbumModal album={album} >
                                    <div className="flex flex-col h-full justify-between  backdrop-brightness-50 p-6 cursor-pointer">
                                        <h1 className="text-2xl mt-16 font-semibold text-center text-white">{album.name}</h1>
                                        <p className="self-end font-bold text-2xl ">R$ {album.value}</p>
                                    </div></AlbumModal>
                            </div>

                        ))}</div>
                    :
                    <div className="mb-8"> {/*Carousel*/}
                        <h1 className="text-[48px]">Trends</h1>
                        <Carousel plugins={[Autoplay({
                            delay: 2000,
                        })
                        ]
                        } opts={{ align: "start", loop: true }} orientation="horizontal" className="w-[100vh]">
                            <CarouselContent>
                                {data.slice(0, 10).map((album, i) => (
                                    <CarouselItem className="basis-[300px]" key={i}>
                                        <CardAlbum album={album}></CardAlbum>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>}
            </section>
        </main >
    )
}