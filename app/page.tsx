import App from "@/components/home/App";
import Hero from "@/components/home/Hero";
import LatestPosts from "@/components/home/LatestPosts";
import NewPodcasts from "@/components/home/NewPodcasts";
import MagAnnounce from "@/components/others/MagAnnounce";

const page = () => {
	return (
		<>
			<Hero />
			<LatestPosts />
			<App />
			<NewPodcasts />
			<MagAnnounce />
		</>
	);
};
export default page;
