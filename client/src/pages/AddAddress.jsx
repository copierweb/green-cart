import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Button from "../components/Button";
import { useAppContext } from "../context/AppContext";
import toast from 'react-hot-toast'

// input field component
const InputField = ({ type, plchldr, name, handleChange, address }) => (
	<input
		type={type}
		placeholder={plchldr}
		name={name}
		onChange={handleChange}
		// value={address[name]}
		required
		className="
			w-full
			py-3 px-2
			text-gray-500 text-md font-normal
			border border-gray-400 rounded-md
			outline-none
			focus:ring-2 focus:ring-primary
			focus:border-transparent				
		"
	/>
);

const AddAddress = () => {
	const {state, axios, navigate} = useAppContext()

	const [address, setAddres] = useState({
		firstName:'',
		lastName:'',
		email:'',
		street:'',
		city:'',
		state:'',
		zipcode:'',
		country:'',
		phone:null,
	})

	const handleChange = (e)=> {
		const {name, value} = e.target

		setAddres((prev)=>({
			...prev,
			[name]: value
		}))
	}

	// console.log(address);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const {data} = await axios.post('/api/v1/address/add', {address})

			if(data.status === 'success') {
				toast.success(data.message)
				navigate("/cart")
			} else {
				toast.error(data.message || "some problem")
			}

		} catch(err) {
			toast.error(err.response?.data.message || err.message)
			console.log(err.response?.data.message || err.message);
		}
	};

	// if not logged in navigate to cart
	useEffect(()=> {
		if(!state.user) {
			navigate("/cart")
		}
	},[])


	return (
		<div>
			<h1 className="text-gray-700 text-3xl font-medium">
				Add Shipping <span className="text-primary">Address</span>
			</h1>
			<div
				className="
					mt-8
					flex flex-col-reverse
					md:flex-row  md:gap-30 gap-5
				"
			>
				<form
					onSubmit={onSubmitHandler}
					className="flex flex-col gap-4 "
				>
					<div className="flex justify-between gap-4">
						<InputField
							type={"text"}
							plchldr={"First Name"}
							name={"firstName"}
							handleChange={handleChange}
							// address={address}
						/>
						<InputField
							type={"text"}
							plchldr={"Last Name"}
							name={"lastName"}
							handleChange={handleChange}
							// address={address}
						/>
					</div>

					<InputField
						type={"email"}
						plchldr={"Email address"}
						name={"email"}
						handleChange={handleChange}
						// address={address}
					/>

					<InputField
						type={"text"}
						plchldr={"Street"}
						name={"street"}
						handleChange={handleChange}
						// address={address}
					/>

					<div className="flex justify-between gap-4">
						{/*{inputField("text", "City", "city")}*/}
						<InputField
							type={"text"}
							plchldr={"City"}
							name={"city"}
							handleChange={handleChange}
							// address={address}
						/>
						<InputField
							type={"text"}
							plchldr={"State"}
							name={"state"}
							handleChange={handleChange}
							// address={address}
						/>
					</div>
					<div className="flex justify-between gap-4">
						{/*{inputField("text", "Zip Code", "zip")}*/}
						<InputField
							type={"number"}
							plchldr={"Zip Code"}
							name={"zipcode"}
							handleChange={handleChange}
							// address={address}
						/>
						<InputField
							type={"text"}
							plchldr={"Country"}
							name={"country"}
							handleChange={handleChange}
							// address={address}
						/>
					</div>
					<InputField
						type={"tel"}
						plchldr={"Phone"}
						name={"phone"}
						handleChange={handleChange}
						// address={address}
					/>

					<Button type="submit" className="justify-center">
						SAVE ADDRESS
					</Button>
				</form>

				<div className="md:flex-1">
					<img src={assets.add_address_iamge} alt="address-img" />
				</div>
			</div>
		</div>
	);
};

export default AddAddress;
