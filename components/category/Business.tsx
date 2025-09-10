import { bizz } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
const Business = () => {
	return (
		<section>
			<div className='flex justify-between items-center mb-4'>
				{" "}
				<p className='text-primary-red'>
					<Icon icon='mdi:business' />
					Business
				</p>{" "}
				<Link href='/posts'>
					<p>View Related</p>
				</Link>
			</div>
			<Image src={bizz} alt='business' />
		</section>
	);
};
export default Business;
