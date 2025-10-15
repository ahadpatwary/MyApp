import { connectToDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import User from '@/models/User'; 
import Card from '@/models/Card'
import cloudinary from '@/lib/cloudinary';

export const UPDATE = async (req: Request) => {

    try {

        const formData = await req.formData();

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
            if (key !== 'picture' && key !== 'id') {
                updateData[key] = value;
            }
        }

        const newPicture = formData.get('picture') as File | null;

        if (newPicture && newPicture.size > 0) {
            if (existingUser.picture?.public_id) {
                await cloudinary.uploader.destroy(existingUser.picture.public_id);
            }

            const arrayBuffer = await newPicture.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadRes = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: 'users' }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                })
                .end(buffer);
            });

            updateData.picture = {
                url: (uploadRes as any).secure_url,
                public_id: (uploadRes as any).public_id,
            };
        }

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