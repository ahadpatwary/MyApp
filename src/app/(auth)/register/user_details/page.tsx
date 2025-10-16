import { InputWithLabel } from "@/components/UserInformation";
import { useprofileUpdate } from "@/hooks/useProfileUpdate";
import { useRouter } from "next/navigation";
import { useState } from "react";


function Home(){
    const {
        name,
        setName, 
        dob, 
        setDob, 
        phoneNumber, 
        setPhoneNumber, 
        picture, 
        setPicture, 
        loading, 
        error, 
        handleUpdate
    } = useprofileUpdate();
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <form
                className="grid w-full max-w-lg items-center gap-3 border-2 p-4 rounded-lg shadow-lg"
                onSubmit={handleUpdate}
            >
                <InputWithLabel
                    name={name}
                    setNmae={setName}
                    dob={dob}
                    setDob={setDob}
                    phoneNumber={phoneNumber}
                    picture={picture}
                    setPhoneNumber={setPhoneNumber}
                    setPicture={setPicture} 
                />
                <button type="submit"> Submit </button>
            </form>
        </div>
    )
}
export default Home;

//       const [preview, setPreview] = useState<string | null>(null);
//   const router = useRouter();

//   const choosePic = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreview(url);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     // POST to API route
//     const res = await fetch("/api/user", {
//       method: "POST",
//       body: formData
//     });

//     if (res.ok) {
//       router.push("/feed");
//     } else {
//       console.log("erro to post data");
//     }
//   };