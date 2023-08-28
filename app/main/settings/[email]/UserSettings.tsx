'use client'

import { User } from "@prisma/client";
import DisplayFormCard from "./DisplayFormCard";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import ApiKeyFormCard from "./ApiKeyFormCard";

interface SettingsProps {
    user: User;
}

const UserSettings = ({user}:SettingsProps) => {
    const { data: session, status } = useSession({ required: true });
    

    //TODO: Create a secured component to simply wrap around the components that need to be secured
    return (
        <main>
            {(status==="authenticated") && (
                <>
                    {(session.user?.email === user.email) ? (
                        <div>
                            <div className="lg:flex lg:flex-row-reverse lg:justify-between mx-4 sm:mx-10 lg:mx-20 ">
                                <div className="hidden lg:block w-1/12"></div>
                                <div className="lg:w-1/2">
                                    <h3 className="text-2xl font-bold text-gray-200">About You</h3>
                                    <hr className="py-2 border-cyan-600" />
                                    <DisplayFormCard
                                        id={user.id}
                                        displayOption="Name"
                                        option="name"
                                        value={user.name!}
                                        description="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
                                        obscured={false}
                                        />
                                    <DisplayFormCard
                                        id={user.id}
                                        displayOption="First Name"
                                        option="firstName"
                                        value={user.firstName!}
                                        description="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
                                        obscured={false}
                                        />
                                    <DisplayFormCard
                                        id={user.id}
                                        displayOption="Last Name"
                                        option="lastName"
                                        value={user.lastName!}
                                        description="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
                                        obscured={false}
                                        />
                                    
                                    <div className="flex flex-row justify-between" >
                                        <div>
                                            <h1 className=" text-xl font-bold py-2 text-gray-300">Profile Picture </h1>
                                            <p className=" text-gray-300 text-sm">Your photo appears on your Profile page and with your stories across Medium.</p>
                                        </div>
                                        <img className="rounded-full w-10 h-10" src={user.image!} alt="" />
                                    </div>

                                    <DisplayFormCard
                                        id={user.id}
                                        displayOption="Email"
                                        option="email"
                                        value={user.email!}
                                        description="Your email address is used to sign in to your account, and to send you notifications. It is a required field."
                                        obscured={false}
                                        />
                                    <DisplayFormCard
                                        id={user.id}
                                        displayOption="password"
                                        option="password"
                                        value={user.password!}
                                        description="Your password is used to sign in to your account. It is a required field."
                                        obscured={true}
                                        />
                                    <ApiKeyFormCard
                                        id={user.id}
                                        displayOption="ApiKey"
                                        value={user.apiKey!}
                                        description="Your password is used to sign in to your account. It is a required field."
                                        />
                                    
                                </div>
                                <div className="lg:w-1/12">
                                    <h1 className=" text-xl font-bold text-gray-200" >Settings</h1>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Not Allowed</p>
                    )}
                </>
            )}
        </main>
    )

}

export default UserSettings;