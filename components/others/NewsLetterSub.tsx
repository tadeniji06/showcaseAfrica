"use client";

import { useState } from "react";

interface Props {
	onComplete: () => void;
	onClose: () => void;
}

const NewsLetterSub = ({ onComplete, onClose }: Props) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const submitForm = async () => {
		try {
			setLoading(true);
			setError("");

			const res = await fetch("/api/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					country,
					phone,
				}),
			});

			if (!res.ok) throw new Error("Failed to submit");

			onComplete();
			onClose();
		} catch (err) {
			setError("Something went wrong. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4'>
			<div className='bg-white p-6 rounded-lg w-full max-w-md shadow-xl space-y-4'>
				<h3 className='text-xl font-semibold'>
					Subscribe to Download
				</h3>

				<input
					type='text'
					className='w-full border p-2 rounded'
					placeholder='Your name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					type='email'
					className='w-full border p-2 rounded'
					placeholder='Your email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type='text'
					className='w-full border p-2 rounded'
					placeholder='Your country'
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>

				<input
					type='text'
					className='w-full border p-2 rounded'
					placeholder='Phone Number'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				{error && <p className='text-red-500 text-sm'>{error}</p>}

				<button
					onClick={submitForm}
					disabled={loading}
					className='w-full bg-primary-red text-white py-2 rounded-lg font-medium hover:bg-red-600 transition'
				>
					{loading ? "Submitting..." : "Submit"}
				</button>

				<button
					onClick={onClose}
					className='w-full text-gray-600 text-sm mt-2'
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default NewsLetterSub;
