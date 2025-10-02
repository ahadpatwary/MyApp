"use client"

import { useState, useEffect } from "react"
import { ResizableDemo } from '@/components/ResizableDemo'

interface User {
  name: string
  email: string
  image: string
  bio: string
  posts: { id: number; title: string; content: string }[]
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  // Dummy fetch simulation
  useEffect(() => {
    const fetchUser = async () => {
      // Normally fetch from API, here dummy data
      const data: User = {
        name: "Abdul Ahad Patwary",
        email: "abdulahadpatwary@gmail.com",
        image: "/profile.jpg",
        bio: "Fullstack Developer | Optimized code lover | Next.js enthusiast",
        posts: Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          title: `Post ${i + 1}`,
          content: "This is a sample post content",
        })),
      }
      setUser(data)
    }
    fetchUser()
  }, [])

  if (!user) return <p className="text-center mt-20">Loading...</p>

  return (
    <ResizableDemo Dot ={false} />
  )
}
