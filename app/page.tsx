import Business from "@/components/category/Business";
import Culture from "@/components/category/Culture";
import Entertainment from "@/components/category/Entertainment";
import Politics from "@/components/category/Politics";
import Sports from "@/components/category/Sports";
import Travel from "@/components/category/Travel";
import App from "@/components/home/App";
import Hero from "@/components/home/Hero";
import LatestMagazines from "@/components/home/LatestMagazines";
import LatestPosts from "@/components/home/LatestPosts";
import NewPodcasts from "@/components/home/NewPodcasts";
import SocialsPosts from "@/components/home/SocialsPosts";

const page = () => {
	return (
		<>
			<Hero />
			<App />
			{/* <Business />
			<Culture />
			<Entertainment />
			<Politics />
			<Sports />
			<Travel /> */}
			<LatestPosts />
			{/* <SocialsPosts /> */}
			<NewPodcasts />
			<LatestMagazines />
		</>
	);
};
export default page;
