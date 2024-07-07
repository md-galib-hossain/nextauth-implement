import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailBody = {
      verifyEmail :  `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a>to${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} </p>`, resetPassword : `<p>Click <a href="${
        process.env.DOMAIN
      }/resetpassword?token=${hashedToken}">here</a>to${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser <br> ${
        process.env.DOMAIN
      }/resetpassword?token=${hashedToken} </p>`
    }
    const mailOptions = {
      from: "mdgalib23@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType ==="VERIFY" ? mailBody.verifyEmail : mailBody.resetPassword,
    };

    const mailRes = await transporter.sendMail(mailOptions);
    return mailRes;
  } catch (err: any) {
    console.log("error in sending email wiht nodemailer: ", err);
  }
};
