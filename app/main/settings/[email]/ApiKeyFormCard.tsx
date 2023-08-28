import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface DisplayFormCardProps {
    id: string,
    displayOption: string, 
    value: string, 
    description: string,
    className?: string
}

interface IFormInput {
    apiKey: string | null
}


const DisplayFormCard = ({id, displayOption, value, description, className}:DisplayFormCardProps) => {

    const [ showing, setShowing ] = useState(false);
    const [ apiKey, setApiKey ] = useState<string | null>(value);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<IFormInput>();

    const onCancel = () => {
        reset();
        setShowing(!showing) 
    }

    const onGenerate = async () => {
        try{
            const response = await fetch(`/api/user/genapikey/${id}`);
            const data: User = await response.json();
            console.log(`Data: ${JSON.stringify(data)}`);
            setApiKey(data.apiKey);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    }
    
    return (
        <div className={`my-10 ${className}`}>
            <div className="flex justify-between ">
                <div>
                    <h1 className=" font-bold text-gray-300 py-1 text-xl" >{displayOption}</h1>
                    <label className="rounded-lg p-1 text-gray-400 bg-[#2b2532] w-10 h-4">{`${(apiKey && showing) ? apiKey : "********" }`}</label>
                </div>
                <div className="flex items-center">
                    {showing && (
                        <button 
                            className="px-4 py-2 text-gray-400 rounded-2xl
                            border-cyan-600 shadow-md bg-[#2b2532] hover:text-gray-200 shadow-cyan-600/50 hover:bg-cyan-600" 
                         onClick={onGenerate}>Generate</button>
                    )}
                    <button type="button" onClick={onCancel} className="text-gray-300 mx-1 px-4 py-2 rounded-2xl
                                border-cyan-600 shadow-md bg-[#2b2532] hover:text-gray-200
                                shadow-cyan-600/50 hover:bg-[#3f3847]">{showing ? "Hide" : "Show"}</button>
                </div>
            </div>
            <hr className="pb-2 border-cyan-600" />
            <p className=" text-sm text-gray-300 " >{description}</p>
        </div>
    );
}

export default DisplayFormCard;