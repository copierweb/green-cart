import { useState } from "react";
import Button from "./Button";
import { useAppContext } from "../context/AppContext";

const Login = () => {
	const [isRegister, setIsRegister] = useState(false);
	const { actions } = useAppContext();

	const onSubmitHandler = async(e)=> {
		e.preventDefault()

		actions.setUser({
			name: 'test-1',
			email: 'test-1@gmail.com'
		})

		actions.closeLoginBox()
	}

	return (
		<div
			className="
				fixed inset-0 bg-black/50
				flex justify-center items-center 
				z-50 
			"
			onClick={() => actions.closeLoginBox()}
		>
			<div
				className="
					w-full max-w-xs 
					py-10 px-5 
					bg-white rounded-lg shadow-lg
				"
				onClick={(e) => e.stopPropagation()}
			>
				<h1
					className="
						pb-5
						text-2xl text-gray-800 text-center 
						font-bold
					"
				>
					<span className="text-primary">User</span>{" "}
					{isRegister ? "Sign Up" : "Login"}
				</h1>
				<form
					onSubmit={onSubmitHandler}
					className="flex flex-col gap-3"
				>
					{isRegister && (
						<div className="flex flex-col gap-1">
							<label htmlFor="name">Name:</label>
							<input
								type="text"
								id="name"
								placeholder="enter Name"
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
					)}
					<div className="flex flex-col gap-1">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							placeholder="enter email"
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
							placeholder="enter password"
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
					<p className="text-gray-600">
						{!isRegister
							? "Create an account?"
							: "Already have account?"}{" "}
						{"  "}
						<span
							className="text-primary cursor-pointer"
							onClick={() => setIsRegister((prev) => !prev)}
						>
							click here
						</span>
					</p>
					<Button 
						type="submit"
						className="justify-center"
					>
						{isRegister ? "Create Account" : "Login"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Login;

