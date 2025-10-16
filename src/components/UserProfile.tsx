'use client'

import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area'
import { AvatarDemo } from '@/components/AvaterDemo'
import { Dot } from '@/components/Dot'
import { ToggleButton } from '@/components/Toggle'
import { AlertDialogDemo } from "@/components/Aleart";
import { DialogDemo } from "@/components/Edit";
import {InputWithLabel} from '@/components/UserInformation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { useprofileUpdate } from '@/hooks/useProfileUpdate'

interface UserProps{
    name?: string;
    email?: string;
    profilePic: string | undefined;
    dot? : boolean;
}

function UserProfile({ profilePic, dot } : UserProps){
    const str : string = "ahad patwary aj nai"
    const {
        name,
        setName, 
        dob, 
        setDob, 
        phoneNumber, 
        setPhoneNumber, 
        picture, 
        setPicture, 
        loading, 
        error, 
        handleUpdate
    } = useprofileUpdate();

    return (
        <>  
            <div className="flex flex-col h-[calc(100vh-8rem)] justify-around items-center p-6 w-full">
     

                <ScrollArea className=" w-full rounded-lg">
                <Card className = "flex flex-col justify-center items-center gap-2 w-full p-4 rounded-lg ">
                    <AvatarDemo src={profilePic} size="size-30" />
                    <p>ahad patwary</p>
                    <p>abdulahadpatwary@gmail.com</p>
                </Card>
                <ScrollBar orientation="horizontal" />
                </ ScrollArea>

             
                <Card className = "flex justify-around items-center gap-2 w-full p-4 rounded-lg">
                    <CardContent className="h-[30px] min-w-[50px] !max-w-[100px]">
                        like
                    </CardContent>
                    <CardContent className="h-[30px] min-w-[50px] !max-w-[100px]">
                        dislike
                    </CardContent>
                    <Button variant="outline" className="h-[30px] w-full cursor-pointer">
                        About
                    </Button>
                </Card>
            </div>

            <Card className="w-full p-3 flex !flex-row justify-between items-center !rounded-none !border-none">
                <p className = 'my-auto text-nowrap overflow-hidden'>Total Profile Like :</p>
                {dot ? (
                    <Dot>
                        {({ setIsOpen }) => (
                            <>
                                <DialogDemo handleUpdate={handleUpdate} setIsOpen={setIsOpen} name="Edit" cardTitle='kahd'>
                                    <InputWithLabel
                                        name={name}
                                        setName={setName}
                                        dob={dob}
                                        setDob={setDob}
                                        phoneNumber={phoneNumber}
                                        setPhoneNumber={setPhoneNumber}
                                        picture={picture}
                                        setPicture={setPicture} 
                                    />
                                </DialogDemo>

                                <AlertDialogDemo
                                    setIsOpen={setIsOpen}
                                    name="Log out"
                                    title={str}
                                    button_name="Log out"
                                />

                                <AlertDialogDemo
                                    setIsOpen={setIsOpen}
                                    name="Delete"
                                    title={str}
                                    button_name="Delete"
                                />
                            </>
                        )}
                    </Dot>
                ) : (
                    <>
                        <ToggleButton />
                    </>
                )}
            </Card>
        </>
    )
}

export {UserProfile};