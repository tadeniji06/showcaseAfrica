import AboutHero from "@/components/AboutHero";
import Mission from "@/components/Mission";
import OurStory from "@/components/OurStory";
import Values from "@/components/Values";

const page = () => {
	return (
		<div className='min-h-screen'>
			<AboutHero />
			<OurStory />
			<Mission />
			<Values />
		</div>
	);
};
export default page;
