import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { episodes } from "@/utils/dummy";
import { NewPodcast } from "../podcasts/App";

const NewPodcasts = () => {
	return (
		<section className='max-w-6xl mx-auto px-4 py-10'>
			<NewPodcast />
		</section>
	);
};

export default NewPodcasts;
