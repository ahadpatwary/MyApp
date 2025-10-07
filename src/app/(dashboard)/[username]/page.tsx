"use client"

import { ResizableDemo } from '@/components/ResizableDemo'
import { useCards } from '@/hooks/fetchCards';

export default function ProfilePage() {
  const { profilePic, myPost } = useCards();
  return (
    <ResizableDemo post = {myPost} profilePic={ profilePic } Dot ={true} />
  )
}
