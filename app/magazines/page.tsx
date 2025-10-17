import MagazineBody from "@/components/magazines/MagazineBody";
import MagazineHero from "@/components/magazines/MagazineHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Magazines | Showcase Africa",
	description:
		"A magazine showcasing the best of Africa — culture, business, tech, lifestyle, and innovation stories from across the continent.",
	keywords: [
		"magazines",
		"showcase",
		"africa",
		"african culture",
		"african innovation",
		"african business",
	],
	applicationName: "Showcase Africa",
	creator: "Showcase Africa Team",
	publisher: "Showcase Africa",
	alternates: {
		canonical: "https://showcaseafricaonline.com/magazines",
	},
	openGraph: {
		title: "Magazines | Showcase Africa",
		description:
			"Explore Africa’s stories, innovations, and culture in our monthly magazine editions.",
		url: "https://showcaseafricaonline.com/magazines",
		siteName: "Showcase Africa",
		type: "article",
		locale: "en_US",
		images: [
			{
				url: "/icon.jpg",
				width: 1200,
				height: 630,
				alt: "Showcase Africa Magazine",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Magazines | Showcase Africa",
		description:
			"A magazine showcasing the best of Africa — culture, innovation, and lifestyle.",
		creator: "@Showcaseafrica_",
		images: ["/icon.jpg"],
	},
	icons: {
		icon: "/icon.jpg",
		shortcut: "/icon.jpg",
		apple: "/icon.jpg",
	},
	robots: {
		index: true,
		follow: true,
	},
};

const page = () => {
	return (
		<>
			<MagazineHero />
			{/* <MagazineBody /> */}
		</>
	);
};

export default page;
