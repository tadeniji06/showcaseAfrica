import App from "@/components/home/App";
import Hero from "@/components/home/Hero";
import LatestPosts from "@/components/home/LatestPosts";
import NewPodcasts from "@/components/home/NewPodcasts";

const page = () => {
	return (
		<>
			<Hero />
			<LatestPosts />
			<App />
			<NewPodcasts />
		</>
	);
};
export default page;
