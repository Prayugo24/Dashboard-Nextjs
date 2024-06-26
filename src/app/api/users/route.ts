import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/app/lib/models';
import { NextRequest,NextResponse } from 'next/server';
import { connectToDB } from "@/app/lib/utils"

const LoadDB = async()=>{
    await connectToDB();
}

LoadDB()
const ITEM_PER_PAGE = 2;

export async function GET(request: NextRequest) {
    try {
        const searchQ = request.nextUrl.searchParams.get('searchQ');
        const page = request.nextUrl.searchParams.get('page');
        const regex = new RegExp(searchQ || '', 'i');
        const currentPage = parseInt(page || '1', 10) || 1;
    
        const count = await User.find({ username: { $regex: regex } }).countDocuments();
        const users = await User.find({ username: { $regex: regex } })
          .limit(ITEM_PER_PAGE)
          .skip(ITEM_PER_PAGE * (currentPage - 1));
    
        return NextResponse.json({ count, users });
        
      } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to fetch users!" });
      }
}

export async function POST(request: NextRequest) {

}