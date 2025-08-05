// import { NextRequest, NextResponse } from "next/server";

// const accessRules = [
// 	{
// 		path: "/signup/otp",
// 		condition: (req: NextRequest) => req.cookies.get("step")?.value === "2",
// 		redirect: "/signup",
// 	},
// 	{
// 		path: "/signup/company-info",
// 		condition: (req: NextRequest) => req.cookies.get("step")?.value === "3",
// 		redirect: "/signup/otp",
// 	},
// 	{
// 		path: "/signup/certificate/otp",
// 		condition: (req: NextRequest) => req.cookies.get("step")?.value === "4",
// 		redirect: "/signup/company-info",
// 	},
// ];

// export function middleware(req: NextRequest) {
// 	const match = accessRules.find(rule =>
// 		req.nextUrl.pathname.startsWith(rule.path)
// 	);

// 	if (match && !match.condition(req)) {
// 		return NextResponse.redirect(new URL(match.redirect, req.url));
// 	}

// 	return NextResponse.next();
// }
