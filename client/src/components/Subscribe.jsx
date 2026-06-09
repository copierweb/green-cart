import Button from './Button';

const Subscribe = () => {
	return (
		<div 
			className="
				
				flex flex-col gap-5
				md:items-center
				max-sm:text-center
			"
		>
			<h1
				className="
					text-gray-900 text-4xl font-bold
				"
			>
				Never Miss a Deal!
			</h1>

			<p className="text-gray-400 text-md font-semibold">
				Subscribe to get the latest offers, new arrivals, and exclusive
				discounts
			</p>
			<div className="flex gap-2">
				<input 
					type="text"
					placeholder='Enter Your email'
					className='
						text-gray-600
						px-2 py-2 md:py-3 md:px-4 
						md:w-lg 
						outline-none
						border border-gray-400 rounded-lg
						max-sm:flex-2
					'	 
				/>

				<Button 
					className='
						md:text-lg max-sm:flex-1
						max-sm:px-1 max-sm:py-1

					'
				>
					Subscribe
				</Button>
			</div>
		</div>
	);
};

export default Subscribe;
