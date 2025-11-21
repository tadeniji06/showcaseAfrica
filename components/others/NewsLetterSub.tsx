"use client";
import { useState } from "react";

const NewsLetterSub = ({ onComplete, onClose }) => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		country: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// simple validation
		if (!form.name || !form.email || !form.phone || !form.country)
			return;

		onComplete(); // unlock the download button
		onClose(); // close modal
	};

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
			<div className='bg-white p-6 rounded-xl w-full max-w-md shadow-lg'>
				<h3 className='text-xl font-semibold mb-4'>
					Subscribe to Download
				</h3>

				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<input
						name='name'
						placeholder='Full Name'
						className='border p-2 rounded'
						value={form.name}
						onChange={handleChange}
						required
					/>

					<input
						name='email'
						type='email'
						placeholder='Email Address'
						className='border p-2 rounded'
						value={form.email}
						onChange={handleChange}
						required
					/>

					<input
						name='phone'
						placeholder='Phone Number'
						className='border p-2 rounded'
						value={form.phone}
						onChange={handleChange}
						required
					/>

					<input
						name='country'
						placeholder='Country of Residence'
						className='border p-2 rounded'
						value={form.country}
						onChange={handleChange}
						required
					/>

					<div className='flex justify-end gap-3 mt-2'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 bg-gray-300 rounded'
						>
							Cancel
						</button>

						<button
							type='submit'
							className='px-4 py-2 bg-red-600 text-white rounded'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewsLetterSub;
