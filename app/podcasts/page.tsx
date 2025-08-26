import PodcastBody from "@/components/podcasts/PodcastBody";
import PodcastHero from "@/components/podcasts/PodcastHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Podcasts | Showcase Africa",
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
	applicationName: "Showcase Africa",
	creator: "Showcase Africa Team",
	publisher: "Showcase Africa",
	alternates: {
		canonical: "https://showcaseafricaonline.com/podcasts",
	},
	openGraph: {
		title: "Podcasts | Showcase Africa",
		description:
			"Explore Africa’s stories, innovations, and culture in our monthly podcast editions.",
		url: "https://showcaseafricaonline.com/podcasts",
		siteName: "Showcase Africa",
		type: "article",
		locale: "en_US",
		images: [
			{
				url: "/icon.jpg",
				width: 1200,
				height: 630,
				alt: "Showcase Africa Podcast",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Podcasts | Showcase Africa",
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
			<PodcastHero />
			<PodcastBody />
		</>
	);
};
export default page;
