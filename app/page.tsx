import Hero from "@/components/home/Hero";
import LatestMagazines from "@/components/home/LatestMagazines";
import LatestPosts from "@/components/home/LatestPosts";
import NewPodcasts from "@/components/home/NewPodcasts";
import SocialsPosts from "@/components/home/SocialsPosts";

const page = () => {
	return (
		<>
			<Hero />
			<LatestPosts />
			<SocialsPosts />
			<NewPodcasts />
			<LatestMagazines />
		</>
	);
};
export default page;
