'use client'

import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area'
import image from "@/../public/picture.png"
import { AvatarDemo } from '@/components/AvaterDemo'
import { Dot } from '@/components/Dot'
import { ToggleButton } from '@/components/Toggle'
import { AlertDialogDemo } from "@/components/Aleart";
import { DialogDemo } from "@/components/Edit";
import {InputWithLabel} from '@/components/UserInformation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"

interface UserProps{
    dot? : boolean;
}

function UserProfile({dot } : UserProps){
    const str : string = "ahad patwary aj nai"

    return (
        <>  
            <div className="flex flex-col h-[calc(100vh-8rem)] justify-around items-center p-6 w-full">
     

                <ScrollArea className=" w-full rounded-lg">
                <Card className = "flex flex-col justify-center items-center gap-2 w-full p-4 rounded-lg ">
                    <AvatarDemo src={image.src} size="size-30" />
                    <p>Abdul Ahad Patwary</p>
                    <p>abdulahadpatwary2006@gmail.com</p>
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
                <p className = 'my-auto'>Total Profile Like :</p>
                {dot ? (
                    <Dot>
                        {({ setIsOpen }) => (
                            <>
                                <DialogDemo setIsOpen={setIsOpen} name="Edit" title="Edit profile">
                                    <InputWithLabel />
                                </DialogDemo>

                                <AlertDialogDemo
                                    setIsOpen={setIsOpen}
                                    name="Log out"
                                    title={str}
                                    button_name="Log out"
                                />

                                <AlertDialogDemo
                                    setIsOpen={setIsOpen}
                                    name="Disable"
                                    title={str}
                                    button_name="Disable"
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