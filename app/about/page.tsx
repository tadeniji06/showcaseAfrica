import AboutHero from "@/components/AboutHero";
import Mission from "@/components/Mission";
import OurStory from "@/components/OurStory";
import Socials from "@/components/Socials";
import Values from "@/components/Values";

const page = () => {
	return (
		<div className='min-h-screen'>
			<AboutHero />
			<OurStory />
			<Mission />
			<Values />
			<Socials />
		</div>
	);
};
export default page;
