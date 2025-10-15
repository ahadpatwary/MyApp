import { connectToDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import User from '@/models/User'; 
import Card from '@/models/Card'
import { updateFile } from '@/lib/updatePicture';

export const UPDATE = async (req: Request) => {

    try {

        const formData = await req.formData();  //id must be sent

        if (!formData) {
            return NextResponse.json(
                { message: 'Data missing' },
                { status: 400 }
            );
        }

        await connectToDb();

        const id = formData.get('id') as string;

        if (!id) {
            return NextResponse.json(
                { message: 'ID missing' },
                { status: 400 }
            );
        }

        const objectId = new Types.ObjectId(id);

        const model = formData.get('model');
        const Model = model === 'User' ? User : Card;

        const existingUser = await Model.findById(objectId);

        if (!existingUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const updateData: Record<string, any> = {};

        for (const [key, value] of formData.entries()) {
            if (key !== 'picture' && key !== 'id' && key !== 'oldPublicId' && key !== 'property') {
                updateData[key] = value;
            }
        }

        const newPicture = formData.get('picture') as File | null; 
        const oldPublicId = formData.get('oldPublicId') as string;
        const property = formData.get("property") as string;

        if (!oldPublicId || !newPicture || newPicture.size < 1) {
            return NextResponse.json(
                { success: false, message: "plese fill all value"},
                { status : 400}
            )
        }

        const uploadRes = await updateFile({ newFile:newPicture, oldPublicId });

        if(!uploadRes.success) {
            return NextResponse.json(
                { success: false, message : uploadRes.message},
                { status : 400}
            )
        } 

        updateData[property] = {
            url: (uploadRes as any).secure_url,
            public_id: (uploadRes as any).public_id,
        };

        await Model.findByIdAndUpdate(objectId, updateData, { new: true });

        return NextResponse.json(
            { success: true, message: 'User updated successfully!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Something wrong:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};