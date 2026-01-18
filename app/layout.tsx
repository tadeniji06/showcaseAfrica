import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import ClarityScript from "@/components/Clarity";

export const metadata: Metadata = {
	title: "Showcase Africa Magazine | African Media",
	description: "A magazine showcasing the best of Africa",
	icons: {
		icon: "/icon.jpg",
	},
	openGraph: {
		title: "Showcase Africa Magazine | African Media",
		description: "A magazine showcasing the best of Africa",
		url: "https://www.showcaseafricaonline.com",
		siteName: "Showcase Africa Magazine",
		images: [
			{
				url: "/icon.jpg",
				width: 1200,
				height: 630,
				alt: "Showcase Africa Magazine Cover",
			},
		],
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Showcase Africa Magazine | African Media",
		description: "A magazine showcasing the best of Africa",
		images: ["/icon.jpg"],
		site: "@tade_niji06",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='antialiased'>
				<Header />
				{children}
				<Footer />
				<ClarityScript />
			</body>
		</html>
	);
}
