import App from "@/components/podcasts/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Podcasts | Business Showcase",
	description:
		"A podcast showcasing the best of Africa — culture, business, tech, lifestyle, and innovation stories from across the continent.",
	keywords: [
		"podcasts",
		"showcase",
		"africa",
		"african culture",
		"african innovation",
		"african business",
	],
	applicationName: "Business Showcase",
	creator: "Business Showcase Team",
	publisher: "Business Showcase",
	alternates: {
		canonical: "https://www.businessshowcaseonline.com/podcasts",
	},
	openGraph: {
		title: "Podcasts | Business Showcase",
		description:
			"Explore Africa’s stories, innovations, and culture in our monthly podcast editions.",
		url: "https://www.businessshowcaseonline.com/podcasts",
		siteName: "Business Showcase",
		type: "article",
		locale: "en_US",
		images: [
			{
				url: "/icon.jpg",
				width: 1200,
				height: 630,
				alt: "Business Showcase Podcast",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Podcasts | Business Showcase",
		description:
			"A podcast showcasing the best of Africa — culture, innovation, and lifestyle.",
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
			<App />
		</>
	);
};
export default page;
