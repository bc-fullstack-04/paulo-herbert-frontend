import { FormEvent, useState } from 'react'
import logo from '../../assets/logo.svg';
import { user_api } from '../../services/apiService'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { InputForm } from '@/components/custom/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/UseAuth';

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const navigate= useNavigate();

  async function handleSigup(event: FormEvent) {
    setLoading(true);
    const toastId = toast.loading("Criando conta...");
    event.preventDefault();

    const data = {
      name,
      email,
      password
    };

    user_api.post("users/create",data)
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Conta criada com sucesso!");
        setLoading(false);
        login(data.email,data.password);
        setTimeout(()=>navigate("/dashboard"),1000)
      }).catch(() => {
        toast.dismiss(toastId);
        toast.error("Falha ao criar a conta");
        setLoading(false)
      });
      
  }

  return (
    <main className=" h-screen bg-fundo bg-cover bg-no-repeat">
      <div className='h-screen backdrop-blur-md backdrop-brightness-50 flex items-center justify-center '>
        <div className="flex flex-col bg-white rounded-md h-fit w-96 items-center p-10 shadow-md">
          <img src={logo} className="h-12" />
          <h1 className="text-3xl font-medium">Criar conta</h1>
          <form onSubmit={handleSigup} className="flex flex-col w-full mt-7 gap-2">
            <InputForm type='text' onChange={event => setName(event.target.value)}>Nome Completo</InputForm>
            <InputForm type='email' required onChange={event => setEmail(event.target.value)}>Email</InputForm>
            <InputForm type='password' required onChange={event => setPassword(event.target.value)}>Senha</InputForm>

            {loading ?
              <Button className='text-white bg-black h-12' disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </Button>
              :
              <Button type='submit' className=" text-lg bg-zinc-900 rounded-2xl text-white h-12">
                Criar Conta
              </Button>
            }
          </form>
          <p className='mt-7 text-sm font-normal text-[#686677]'>Já tem uma conta ? <Link to="/login" className='text-[#100F14] font-bold underline'>Entrar</Link></p>
        </div>
      </div>
    </main>
  )
}
