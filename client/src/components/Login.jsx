import { useState } from "react";
import Button from "./Button";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast"
import useCartActions from "../hooks/useCartActions";

const Login = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const {addToCart} = useCartActions()

	const { state, actions, axios } = useAppContext();

	const onSubmitHandler = async(e)=> {
		try {
			e.preventDefault()
			const state = isRegister ? 'register' : 'login'

			const {data} = await axios.post(`/api/v1/users/${state}`,
				{
					name,
					email,
					password	
				}
			)

			if(data.status === 'success') {
				actions.setUser(data.user)
				toast.success(data.message)
				actions.closeLoginBox()
				actions.setCart(data.user.cartItems)
			} else {
				toast.error(data.message || "something went wrong")
			}

		} catch(err) {
			toast.error(err.response?.data.message || err.message)
			console.log(err.response?.data.message || err.message);
		}

		// actions.setUser({
		// 	name: 'test-1',
		// 	email: 'test-1@gmail.com'
		// })

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
								required
								value={name}
								onChange={(e)=>setName(e.target.value)}
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
							required
							value={email}
							onChange={(e)=>setEmail(e.target.value)}
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
							required
							value={password}
							onChange={(e)=>setPassword(e.target.value)}
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

