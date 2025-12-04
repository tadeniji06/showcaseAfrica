import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { name, email, country, phone } = await request.json();

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: 400 }
			);
		}

		const emailContent = `
New Magazine Subscriber

Name: ${name || "N/A"}
Email: ${email}
Country: ${country || "N/A"}
Phone: ${phone || "N/A"}

Subscribed At: ${new Date().toLocaleString()}
		`;

		const resendResponse = await fetch(
			"https://api.resend.com/emails",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: "onboarding@resend.dev",
					to: "m360solutionsgroup@gmail.com",
					subject: "New Magazine Subscriber",
					text: emailContent,
				}),
			}
		);

		const data = await resendResponse.json();

		if (!resendResponse.ok) {
			console.error("Resend Error:", data);
			throw new Error("Email sending failed");
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
