import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../Button';

const SellerLogin = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { actions } = useAppContext()

	const onSubmitHandler = async(e)=> {
		e.preventDefault()
		actions.setIsSeller()
	}

	return (
		<div
			className="
				fixed inset-0 
				flex justify-center items-center 
				z-50 
			"
			
		>
			<div
				className="
					w-full max-w-sm 
					py-10 px-10 
					border border-gray-200
					rounded-lg shadow-lg
				"
				
			>
				<h1
					className="
						pb-5
						text-2xl text-gray-800 text-center 
						font-bold
					"
				>
					<span className="text-primary">Seller</span>{" "}
					Login
				</h1>
				<form
					onSubmit={onSubmitHandler}
					className="flex flex-col gap-3"
				>

					<div className="flex flex-col gap-1">
						<label htmlFor="eamil">Email:</label>
						<input
							type="email"
							id="email"
							placeholder="enter email"
							// required
							value={email}
							onChange={(e)=> setEmail(e.target.value)}
							className="
								w-full 
								p-2 text-md text-gray-400 font-normal
								outline-none
								border border-gray-500
								rounded-lg
								focus:ring-2 focus:ring-primary 
								focus:border-transparent
							"
							
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							placeholder="enter Password"
							// required
							value={password}
							onChange={(e)=> setPassword(e.target.value)}
							className="
								w-full 
								p-2 text-md text-gray-400 font-normal
								outline-none
								border border-gray-500
								rounded-lg
								focus:ring-2 focus:ring-primary 
								focus:border-transparent
							"
						/>
					</div>

					<Button type="submit" className="justify-center">
						Login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default SellerLogin;
