import Posts from "./Posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stories & Insights | Showcase Africa",
	description:
		"Discover inspiring stories, insights, and perspectives from across Africa. Stay updated with the latest trends, culture, business, and innovation on the continent.",
	keywords: [
		"africa stories",
		"african insights",
		"african culture",
		"african business",
		"african innovation",
		"africa blog",
		"showcase africa",
		"african perspectives",
		"african lifestyle",
		"african entrepreneurs",
	],
	applicationName: "Showcase Africa",
	creator: "Showcase Africa Team",
	publisher: "Showcase Africa",
	alternates: {
		canonical: "https://showcaseafricaonline.com/posts",
	},
	openGraph: {
		title: "Stories & Insights | Showcase Africa",
		description:
			"Discover inspiring stories, insights, and perspectives from across Africa. Stay updated with the latest trends, culture, and innovation.",
		url: "https://showcaseafricaonline.com/posts",
		siteName: "Showcase Africa",
		type: "website",
		locale: "en_US",
		images: [
			{
				url: "/icon.jpg",
				width: 1200,
				height: 630,
				alt: "Showcase Africa Stories",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Stories & Insights | Showcase Africa",
		description:
			"Discover inspiring stories, insights, and perspectives from across Africa.",
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
			<Posts />
		</>
	);
};

export default page;