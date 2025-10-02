'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ShowCard } from '@/components/ShowCard'
import { MenubarDemo } from '@/components/Bar'
import { UserProfile } from '@/components/UserProfile'
import { CustomWrapper } from '@/components/CustomWrapper'


interface dotProps{
  Dot : boolean;
}

export function ResizableDemo({ Dot }: dotProps) {
  return (
    <>
      <MenubarDemo />
      <div className = "h-15 w-screen"> </div>
    
      <ResizablePanelGroup direction="horizontal" className="w-full border">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <UserProfile dot ={Dot} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={70}>
          <CustomWrapper>
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
            <ShowCard dot ={Dot} />
          </CustomWrapper>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}