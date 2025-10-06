// src/types/global.d.ts
declare global {
    interface ICard{
        _id: string;
        user: Types.ObjectId;           
        image?: string;                
        title: string;                 
        description?: string;           
        cardLikes: Types.ObjectId[];    
        cardDislikes: Types.ObjectId[]; 
        videoPrivacy: "public" | "private";

        createdAt: Date;
        updatedAt: Date;
    }
}

export {}; // এটা লাগবে otherwise file global declare হিসেবে recognize হবে না


// এরপর import ছাড়াই যেকোনো file এ TypeScript এটা recognize করবে।

// Next.js project এ tsconfig.json এ typeRoots / include ঠিক করে দিতে হবে যাতে global.d.ts include হয়।