import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg"
import icon from "../../assets/user.png"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/UseAuth";



export function Header() {
    const auth = useAuth();

    return (<header className="px-[150px] py-3 flex items-center justify-between text-white bg-white backdrop-blur-lg bg-opacity-25">
        <Link to={"/"}>
            <div className='text-white flex gap-2 items-center'>
                <img src={logo} alt="logo" />
                <p>BootPlay</p>
            </div>
        </Link>
        <div className="flex items-center gap-10">
            <NavLink to={"/albums"} className={({ isActive }) => isActive ? "font-extrabold" : "font-normal"} >Meus discos</NavLink>
            <NavLink to={"/wallet"} className={({ isActive }) => isActive ? "font-extrabold" : "font-normal"}>Carteira</NavLink>
            <DropdownMenu>
                <DropdownMenuTrigger><img className="w-[50px] h-[50px]" src={icon} alt="icon" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Olá, {auth.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={"/dashboard"}>
                        <DropdownMenuItem>Ver Catálogo</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => auth.logout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    </header>
    )
}