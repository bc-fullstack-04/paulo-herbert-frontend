import{ FormEvent, useState } from 'react'
import logo from '../../assets/logo.svg';
import {InputForm } from '@/components/custom/Input';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ButtonForm } from '@/components/custom/ButtonForm';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [loading,setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    setLoading(true);
    event.preventDefault();
    login(email, password)
    .then(() => { 
      toast.success("Login efetuado com sucesso!");
      setTimeout(() => {
        <Navigate to={'/dashboard'}/>
      }, 2000);
    }).catch(() => {
      toast.error("Erro ao efetuar login!");
      setLoading(false);
    });
    
  }

  return (
    <>
      {isAuthenticated && <Navigate to={'/dashboard'}/> }
      <div className="bg-fundo bg-cover bg-no-repeat h-screen">
        <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
          {/* Container */}
          <div className="flex w-[544px] h-[450px] bg-white p-5 rounded-3xl">
            <div className="flex flex-col items-center justify-center w-full gap-3">
              <img src={logo} className="h-12" />
              <h1 className="text-2xl font-semibold">Acesse sua conta</h1>
              {/* From */}
              <form onSubmit={handleLogin} className="flex flex-col w-80">
                <InputForm onChange={e => setEmail(e.target.value)} type='email'>Email:</InputForm>
                <InputForm onChange={e => setPassword(e.target.value)} type='password'>Senha:</InputForm>
                {loading ? <Button  className='text-white bg-black ' disabled><Loader2 className=" mr-2 h-4 w-4 animate-spin "/>Carregando...</Button>
                          : <ButtonForm >Entrar</ButtonForm>}
              </form>
              <p className="text-sm font-light">Ainda não tem conta ? <a href="/signup" className="font-semibold underline">Inscrever-se</a></p>
              {/* From */}
            </div>
          </div>
          {/* Container */}
        </div>
      </div>
    </>
  )
}
