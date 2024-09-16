import dbConnect from "@/app/_lib/dbConnection";
import UserModel from "@/app/_lib/models/users.model";

dbConnect();

export async function GET() {
  try {
    const users = await UserModel.find();
    return new Response(JSON.stringify({ data: users }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const user = await UserModel.create(await request.json());
    return new Response(JSON.stringify({ message: "created", data: user }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
