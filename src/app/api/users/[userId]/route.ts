
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/app/lib/models';
import { connectToDB } from "@/app/lib/utils"

const LoadDB = async()=>{
    await connectToDB();
}

LoadDB()

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
      const {userId} = params
      const user = await User.findById(userId);
      return NextResponse.json({ user });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Failed to fetch users!" });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
    const id = params.userId;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'User successfully deleted', user: deletedUser });
    } catch (err) {
      console.error('Failed to delete user:', err);
      return NextResponse.json({ message: 'Failed to delete user!' }, { status: 500 });
    }
}
export async function UPDATE(request: NextRequest, { params }: { params: { userId: string } }) {

}