'use client';

import React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ShowCard } from '@/components/ShowCard';
import { MenubarDemo } from '@/components/Bar';
import { UserProfile } from '@/components/UserProfile';
import { CustomWrapper } from '@/components/CustomWrapper';

interface DotProps {
  Dot: boolean;
}

export function ResizableDemo({ Dot }: DotProps) {
  return (
    <> 
      <MenubarDemo />
      <div className="h-[60px] w-screen" /> {/* Tailwind compatible height */}

      <ResizablePanelGroup direction="horizontal" className="w-full border">
        {/* Left Panel */}
        <ResizablePanel defaultSize={30} >
          <UserProfile dot={Dot} />
        </ResizablePanel>

        {/* Resize Handle */}
        <ResizableHandle withHandle />

        {/* Right Panel */}
        <ResizablePanel defaultSize={70}>
          <CustomWrapper>
            <ShowCard dot={Dot} />
            <ShowCard dot={Dot} />
            <ShowCard dot={Dot} />
            <ShowCard dot={Dot} />
            <ShowCard dot={Dot} />
            <ShowCard dot={Dot} />
            <ShowCard dot={Dot} />
          </CustomWrapper>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}