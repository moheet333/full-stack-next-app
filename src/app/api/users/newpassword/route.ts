import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { password, token } = reqBody;
        console.log(token);

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTOkenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTOkenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "New password created", success: true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}