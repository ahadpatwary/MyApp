'use client';

import React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ShowCard } from '@/components/ShowCard';
import { MenubarDemo } from '@/components/Bar';
import { UserProfile } from '@/components/UserProfile';
import { CustomWrapper } from '@/components/CustomWrapper';
import { useIsMobile } from "@/hooks/use-mobile";

interface DotProps {
  post: ICard[];
  profilePic?: string | undefined;
  Dot: boolean;
}

export function ResizableDemo({ post, profilePic, Dot }: DotProps) {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen w-full flex flex-col">
      <MenubarDemo />

      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"} // laptop: horizontal, mobile: vertical
        className="flex-1 flex pt-14 md:pt-14"
      >
        <ResizablePanel defaultSize={30} minSize={isMobile ? 2 : 1}   className="overflow-auto ">
          <UserProfile dot={Dot} profilePic={profilePic} />
        </ResizablePanel>

        <ResizableHandle withHandle className={isMobile ? "h-3 " : "w-3 "} />

        <ResizablePanel defaultSize={70} 
          minSize={isMobile ? 2 : 1}  
          className="overflow-auto ">
          <CustomWrapper>
            {post.map((card) => (
              <ShowCard
                key={card._id}
                cardId={card._id}
                userId={card.user}
                title={card.title}
                image={card.image?.url}
                description={card.description}
                dot={true}
              />
            ))}
          </CustomWrapper>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}