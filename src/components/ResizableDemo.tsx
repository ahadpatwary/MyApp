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

export function ResizableDemo({ post, profilePic, Dot }: DotProps) {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Top Menubar */}
      <MenubarDemo />
      <div className="h-[60px] w-full" />

      {/* Resizable Panels */}
      <div className="flex-1 flex flex-col">
        <ResizablePanelGroup direction="vertical" className="flex-1 flex flex-col">
          {/* Top Panel - Profile */}
          <ResizablePanel defaultSize={100} className="overflow-auto">
            <UserProfile dot={Dot} profilePic={profilePic} />
          </ResizablePanel>

          {/* Handle */}
          <ResizableHandle withHandle className="h-2 " />

          {/* Bottom Panel - Cards */}
          <ResizablePanel defaultSize={0} className="overflow-auto ">
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
    </div>
  );
}