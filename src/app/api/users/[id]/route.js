import dbConnect from "@/app/_lib/dbConnection";
import UserModel from "@/app/_lib/models/users.model";

dbConnect();

export async function GET(_, { params: { id } }) {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: "User is not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ data: user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(request, { params: { id } }) {
  try {
    const user = await UserModel.findByIdAndUpdate(id, await request.json(),{new: true});
    return new Response(JSON.stringify({ message: "updated", data: user }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(_, { params: { id } }) {
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return new Response(JSON.stringify({ error: "User is not found" }), {
        status: 404,
      });
    }
    return new Response( null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
