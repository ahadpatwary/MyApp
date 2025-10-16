'use client';

import React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ShowCard } from '@/components/ShowCard';
import { MenubarDemo } from '@/components/Bar';
import { UserProfile } from '@/components/UserProfile';
import { CustomWrapper } from '@/components/CustomWrapper';

interface DotProps {
  post: ICard[];
  profilePic?: string | undefined;
  Dot: boolean;
}

export function ResizableDemo({post, profilePic, Dot }: DotProps) {
  return (
    <> 
      <MenubarDemo />
      <div className="h-[60px] w-screen" /> {/* Tailwind compatible height */}

      <ResizablePanelGroup direction="horizontal" className="w-full border">
        {/* Left Panel */}
        <ResizablePanel defaultSize={30} >
          <UserProfile dot={Dot} profilePic={profilePic} name= "ahad patwary" />
        </ResizablePanel>

        {/* Resize Handle */}
        <ResizableHandle withHandle />

        {/* Right Panel */}
        <ResizablePanel defaultSize={70}>
          <CustomWrapper>
            {
              post.map((card) => ( 
                <ShowCard
                  key={card._id}
                  cardId ={card._id}
                  name={card.name}
                  picture={card.proPic?.url}
                  title={card.title}
                  image={card.image?.url} 
                  description={card.description} 
                  dot ={true} 
                />
              )
            )} 
          </CustomWrapper> 
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}