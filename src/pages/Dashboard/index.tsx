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
import { Header } from "@/components/custom/Header";
import { CardAlbumList } from "@/components/custom/CardAlbumList";
import { CardAlbumCarousel } from "@/components/custom/CardAlbumCarousel";


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
        if (value.length === 0) {
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
            <Header />
            <div className="backdrop-brightness-50 h-[60vh]">
                <div className="mt-[300px] w-[550px] ml-8 flex flex-col">
                    <h1 className="font-semibold text-[40px] text-balance">A história da música não pode ser esquecida!</h1>
                    <p className="text-[24px]">Sucessos que marcaram o tempo!!!</p>
                </div>
            </div>
            {/* Trends + Area de Pesquisa  */}
            <section className="bg-[#19181F]  h-full w-full flex flex-col items-center ">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    searchAlbum();
                }} className="flex px-3 mt-5 justify-between border rounded-md border-white max-w-[448px] w-[448px] h-[50px]">
                    <input type="text" onChange={handleInputChange} className="bg-transparent w-full outline-none" />
                    <img className="cursor-pointer" onClick={searchAlbum} src={lupa} alt="lupa" />
                </form>
                {isSearching ?
                    <div className="px-5 my-8 w-full flex justify-center flex-wrap text-balance gap-5">  {/* Results / */}
                        {data.slice(0, 10).map((album, i) => (
                            <CardAlbumList album={album} key={i} />
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
                                        <CardAlbumCarousel album={album}></CardAlbumCarousel>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>}
            </section>
        </main >
    )
}