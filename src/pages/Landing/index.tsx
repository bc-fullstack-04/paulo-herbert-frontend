import logo from "../../assets/logo.svg"
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <>

      <main className='bg-fundo bg-cover bg-no-repeat'>
        <header className='px-[100px] py-3 flex justify-between backdrop-blur-lg backdrop-brightness-50 bg-white bg-opacity-30'>
          <div className='text-white flex gap-2 items-center'>
            <img src={logo} alt="logo" />
            <p>BootPlay</p>
          </div>
          <div className='flex gap-3'>
            <Link to="/login" className="w-[200px] rounded-[32px] bg-[#010B0F] text-white flex justify-center font-semibold items-center ">Entrar</Link>
            <Link to="/signup" className="w-[200px] rounded-[32px] bg-[#9EE2FF] font-semibold flex justify-center items-center">Inscrever-se</Link>
          </div>
        </header>
        <div className=' h-screen backdrop-brightness-50 '>
          <div className='mx-[100px] w-[701px] text-white pt-[220px]'>
            <h1 className='font-semibold text-[64px]'>A história da música não pode ser esquecida!</h1>
            <p className='text-[24px] font-normal text-balance'>Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.</p>
            <Link to="/signup" className="mt-3 text-black w-[270px] py-4 rounded-[32px] bg-[#9EE2FF] font-semibold flex justify-center items-center">Inscrever-se</Link>
          </div>
        </div>
      </main>
    </>
  )
}

