import User from "@/models/UserModel";
import connect from "@/utils/db_connect";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export interface loginFormData {
  email: string;
  password: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connect();

    const formData = (await req.json()) as loginFormData;
    const { email, password }: loginFormData = formData;
    
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Credentials Required!",
        },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Credentials!",
        },
        { status: 400 }
      );
    }

    const flag = await bcrypt.compare(password, user.password);
    if (!flag) {
      return NextResponse.json(
        {
          message: "Invalid Credentials!",
        },
        { status: 400 }
      );
    }
    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    const secret = process.env.JWT_SECRET as string;
    const access_token = jwt.sign({ id: user._id }, secret, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    
    const response = NextResponse.json(
      {
        message: "Login Successful!",
        user: userWithoutPassword,
        access_token,
      },
      { status: 200 }
    );
    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 3,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
