'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
      <div className="h-15 w-screen"></div>

      <ResizablePanelGroup
        direction="horizontal"
        className="w-full flex flex-col md:flex-row border"
      >
        {/* Sidebar */}
        <ResizablePanel
          defaultSize={30}
          minSize={20}
          maxSize={40}
          className="order-1 md:order-none w-full md:w-auto"
        >
          <UserProfile dot={Dot} />
        </ResizablePanel>

        {/* Resizable handle */}
        <ResizableHandle className="hidden md:block" />

        {/* Main Content */}
        <ResizablePanel defaultSize={70} className="order-2 md:order-none w-full">
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
  );
}