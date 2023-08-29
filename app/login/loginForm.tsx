'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AiFillGithub } from 'react-icons/ai';
import { IoLogoGoogle } from 'react-icons/io';

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';

interface LoginFormClassOptions {
    className?: string
}

interface LoginFormOptions {
    email: string,
    password: string
}

const LoginForm = ({className}: LoginFormClassOptions) => {
    const { data: session, status } = useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormOptions>();
    const router = useRouter();

    useEffect(() => {
        if(status === "loading") return;
        if(session) router.push("/main");
    }, [session, status]);

    const onSubmit: SubmitHandler<LoginFormOptions> = data => console.log(data);
    const redirectToSignup = () => router.push('/signup');
 
    return (
        <div className={`${className} rounded-2xl shadow-lg border-4 border-yellow-900/60`}>
            <form className=' px-16 py-8 bg-[url("/bg1.jpg")] rounded-2xl flex-row justify-between ' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        {...register("email", { required: true })}
                        className='m-4 rounded-lg p-3 text-gray-400 text-lg bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="email"
                        placeholder="Email"
                    />                                
                </div>
                <div>
                    <input
                        {...register("password", { required: true })} 
                        className='m-4 rounded-lg p-3 text-gray-400 text-lg bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="password" 
                        name="password" 
                        placeholder="Password"
                    />
                </div>
                <div className='flex flex-col items-center justify-between m-4 hover:text-gray-200
                                 rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 p-2
                                 active:translate-y-1'>
                    <input type="submit" value="Login" className='text-gray-400 text-lg'/>
                </div>
                <div className='px-4 flex flex-col items-center justify-center'>
                    <h5 className='text-gray-400'>Or Sign In using</h5>
                    <div className='my-2 flex space-x-4'>
                        <h5 className=" text-4xl cursor-pointer text-gray-300 hover:text-yellow-500/80" onClick={() => signIn()}><AiFillGithub/></h5>
                        <h5 className=" text-4xl cursor-pointer text-gray-300 hover:text-yellow-500/80" onClick={() => signIn()}><IoLogoGoogle/></h5>
                    </div>
                </div>
                <div className='px-4 my-2'>
                    <h1 className="text-gray-400 ">Don't have an account? <span className="text-yellow-500/70 hover:text-yellow-500/90 hover:cursor-pointer" onClick={redirectToSignup}>sign-up!</span></h1>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;