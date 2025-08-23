import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

export const metadata: Metadata = {
	title: "Showcase Africa Magazine | African Media",
	description: "A magazine showcasing the best of Africa",
	icons: {
		icon: "/icon.jpg",
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
			</body>
		</html>
	);
}
