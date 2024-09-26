import dbConnect from "@/app/_lib/dbConnection";
import UserModel from "@/app/_lib/models/users.model";
import userValidationSchema from "./schema";

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
    const user = await request.json()
    const validation = userValidationSchema.safeParse(user)
    if (!validation) {
      return new Response(JSON.stringify({ message:validation.error.errors}),{status:400})
    }
    const newUser = await UserModel.create(input);
    return new Response(JSON.stringify({ message: "created", data: newUser }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
