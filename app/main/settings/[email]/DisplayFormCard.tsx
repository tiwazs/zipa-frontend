import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface DisplayFormCardProps {
    id: string,
    displayOption: string, 
    option: "name" | "firstName" | "lastName" | "email" | "password" | "image" | "password",
    value: string, 
    description: string,
    obscured: boolean | null,
    className?: string
}

interface IFormInput {
    id: string,
    name: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    image: string | null,
    password: string | null
}


const DisplayFormCard = ({id, displayOption, option, value, description, obscured, className}:DisplayFormCardProps) => {

    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<IFormInput>();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<IFormInput> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`/api/user/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);
            setEditing(false);
        }catch(e){
            console.log(`Error: ${e}`);
            setEditing(false);
        }
    }
    
    return (
        <div className={`my-10 ${className}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between ">
                <div>
                    <h1 className=" font-bold text-gray-300 py-1 text-xl" >{displayOption}</h1>
                    <input 
                        {...register("id", {required: true})}
                        type="hidden"
                        name="postId"
                        value={id}
                    />
                    <input 
                        {...register(option, {required: true})}
                        type={`${obscured ? "password" : "text"}`}
                        placeholder={`${(obscured && value) ?  "*******": value}`}
                        className="rounded-lg p-1 text-gray-400 bg-[#2b2532]" 
                        disabled={!editing}
                    />
                </div>
                <div className="flex items-center">
                    {editing && (
                        <input 
                            type="submit" 
                            className="px-4 py-2 text-gray-400 rounded-2xl cursor-pointer
                            border-cyan-600 shadow-md bg-[#2b2532] hover:text-gray-200 shadow-cyan-600/50 hover:bg-cyan-600" 
                            value="Save"
                        />
                    )}
                    <button type="button" onClick={onCancel} className="text-gray-300 mx-1 px-4 py-2 rounded-2xl
                                border-cyan-600 shadow-md bg-[#2b2532] hover:text-gray-200
                                shadow-cyan-600/50 hover:bg-[#3f3847]">{editing ? "Cancel" : "Edit"}</button>
                </div>
            </form>
            <hr className="pb-2 border-cyan-600" />
            <p className=" text-sm text-gray-300 " >{description}</p>
        </div>
    );
}

export default DisplayFormCard;