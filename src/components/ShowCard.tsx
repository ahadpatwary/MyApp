"use client";

import Image from "next/image"
import { AvatarDemo } from "@/components/AvaterDemo"
import { Button } from "@/components/ui/button"
import { Dot } from '@/components/Dot'
import Link from "next/link"
import { AlertDialogDemo } from "@/components/Aleart";
import { DialogDemo } from "@/components/Edit";
import { ToggleButton } from '@/components/Toggle'
import { currentState } from '@/lib/currentState'
import { LikeButton } from '@/components/likeButton'
import { SaveButton } from "@/components/saveButton";
import { useUpdateCard } from "@/hooks/useUpdateCard";
import { ContentField } from "@/components/contentField";



interface CardProps {
  cardId?: string ;
  name?: string;
  picture?: string;
  title?:string;
  description?: string;
  image?: string ;
  dot? : boolean;
}

function ShowCard(
  {
    cardId,
    name,
    picture,
    title,
    description,
    image,
    dot = false
  }: CardProps) {
    
  const [state, setState] = React.useState<string>("");

  React.useEffect(() => {
    const fetchState = async () => {
      try {
        const result = await currentState(cardId, "videoPrivacy");
        setState(result);
      } catch (error) {
        console.error("Error fetching videoStatus:", error);
      }
    };

    if (cardId) fetchState();
  }, [cardId]);


    const {
      title,
      setTitle,
      content,
      setContent,
      picture,
      setPicture,
      loading,
      error,
      handleUpdate,
    } = useUpdateCard(cardId);


  const str : string = "This action cannot be undone. This will permanently delete your account and remove your data from our servers."

  return (
    <div
      className="w-full max-w-[400px] min-w-[340px] mx-auto p-4 border border-black shadow-md flex-1  rounded-lg h-[80vh] md:h-[80vh] lg:h-[85vh]"
    >
      
      <div 
        className="relative w-full h-[60%] md:h-[65%] lg:h-[70%] border-2 rounded overflow-hidden mb-4"
      >
        <Image
          src={image as string}
          fill
          alt="image"
          sizes="300"
          priority
          className="object-contain rounded"
        />
      </div>

 
      <div className=" h-[35%] md:h-[30%] lg:h-[25%] flex flex-col justify-between">
        <div className="flex justify-between items-center gap-2 my-2">
          
            < LikeButton cardId = {cardId} />

            { dot ?
              (
                <Dot>
                  {({ setIsOpen }) => (
                    <>
                      <AlertDialogDemo
                        cardId={cardId as string}
                        setIsOpen={setIsOpen} 
                        name="Delete" 
                        title={str} 
                        button_name="Delete"
                      />

                      <DialogDemo 
                        loading = {loading}
                        error ={error}
                        setIsOpen = {setIsOpen} 
                        name ="Edit" 
                        cardTitle="Edit profile" 
                        handleUpdate={handleUpdate}
                      >
                        <ContentField
                          title={title}
                          setTitle={setTitle}
                          content={content}
                          setContent={setContent}
                          picture={picture}
                          setPicture={setPicture}
                        />
                      </DialogDemo>


                      <ToggleButton
                        id={cardId} 
                        setIsOpen={setIsOpen} 
                        name ="videoPrivacy" 
                        state= { state }
                      />
                    </>
                  )}
                </Dot>
              )
              : < SaveButton  cardId = {cardId} />
            }
        </div>
  
        <div className="flex h-full items-center gap-4">
          <Button 
            className ="h-15 w-15 rounded-full cursor-pointer transfarent" 
          > 
            <AvatarDemo src={picture} /> 
          </Button> 

          <div className="flex flex-col">
            <Link href= "/ahadPatwary"> {name} </Link>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p> {description} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ShowCard };