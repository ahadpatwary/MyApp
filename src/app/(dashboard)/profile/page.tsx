'use client'

import { ResizableDemo } from '@/components/ResizableDemo'
import { useCards } from '@/hooks/fetchCards';

function Profile (){
  const { profilePic, myPost } = useCards();

  return (
    <>
      <ResizableDemo post = {myPost} profilePic={ profilePic } Dot ={true} />
    </>
  )
}

export default Profile;