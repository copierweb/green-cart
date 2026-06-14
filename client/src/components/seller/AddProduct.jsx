import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import Button from "../Button";
import { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
	const [productValue, setProductValue] = useState({
		name: "",
		category: "",
		price: 0,
		offerPrice: 0,
		description: [],
	});
	const [imgFiles, setImgFiles] = useState([]);

	const { state, axios, actions } = useAppContext();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProductValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeFiles = (e, index) => {
		const { files } = e.target;
		const updatedImages = [...imgFiles];
		updatedImages[index] = files[0]; // used for replacing existing image at index

		setImgFiles(updatedImages);
	};

	const handleOnSubmit = async (e) => {
		try {
			actions.setUploading(true)

			e.preventDefault();
			const productData = {
				...productValue,
				description: productValue.description.split("\n"),
			};

			const formData = new FormData();
			// append product data
			formData.append("productData", JSON.stringify(productData));

			// append image files to form data (use forEach for multiple images)
			Array.from(imgFiles).forEach((img, index) => {
				formData.append("images", img);
			});

			// send form data to backend
			const { data } = await axios.post("/api/v1/product/add", formData);

			if (data.status === "success") {
				toast.success(data.message);
				setProductValue({
					name: "",
					category: "",
					price: 0,
					offerPrice: 0,
					description: [],
				});
				setImgFiles([])
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			toast.error(err.response?.data.message || err.message);
			console.log(err);
		} finally {
			actions.setUploading(false)
		}
	};
	// console.log(imgFiles);
	return (
		<form
			onSubmit={handleOnSubmit}
			className="md:max-w-lg flex flex-col gap-4"
		>
			<div className="flex flex-col gap-3">
				<label className="text-gray-600 text-lg font-medium">
					Product Image
				</label>
				<div className="flex justify-start gap-2">
					{Array(4)
						.fill("")
						.map((_, index) => (
							<label key={index} htmlFor={`image-${index}`}>
								<input
									type="file"
									id={`image-${index}`}
									hidden
									name="images"
									onChange={(e) =>
										handleChangeFiles(e, index)
									}
								/>
								<img
									src={
										imgFiles[index]
											? URL.createObjectURL(
													imgFiles[index],
												)
											: assets.upload_area
									}
									alt="img-upload"
									className="w-24 h-auto cursor-pointer"
								/>
							</label>
						))}
				</div>
			</div>
			<div className="flex flex-col gap-3 ">
				<label className="text-gray-600 text-lg font-medium">
					Product Name
				</label>
				<input
					className="
						w-full
						outline-none 
						p-2
						text-gray-400
						border border-gray-300
						focus:ring focus:ring-primary focus:border-transparent
					"
					placeholder="Type here"
					type="text"
					name="name"
					value={productValue.name}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col gap-3">
				<label className="text-gray-600 text-lg font-medium">
					Product Description
				</label>
				<textarea
					className="
						outline-none 
						p-2
						text-gray-400
						border border-gray-300
						focus:ring focus:ring-primary focus:border-transparent
					"
					rows="5"
					placeholder="Type here"
					type="textarea"
					name="description"
					value={productValue.description}
					onChange={handleChange}
				></textarea>
			</div>

			<div className="flex flex-col gap-3">
				<label className="text-gray-600 text-lg font-medium">
					category
				</label>
				<select
					className="
						outline-none 
						p-2
						text-gray-500
						border border-gray-300
						focus:ring focus:ring-primary focus:border-transparent
					"
					name="category"
					value={productValue.category}
					onChange={handleChange}
				>
					<option value="" disabled>
						Select Category
					</option>
					{categories.map((cate) => (
						<option value={cate.path} key={cate.path}>
							{cate.path}
						</option>
					))}
				</select>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex flex-col gap-3 md:w-full">
					<label className="text-gray-600 text-lg font-medium">
						Product Price
					</label>
					<input
						className="
						outline-none 
						p-2
						text-gray-400
						border border-gray-300
						focus:ring focus:ring-primary focus:border-transparent
					"
						type="number"
						// defaultValue={0}
						name="price"
						value={productValue.price}
						onChange={handleChange}
					/>
				</div>

				<div className="flex flex-col gap-3 md:w-full">
					<label className="text-gray-600 text-lg font-medium">
						Offer Price
					</label>
					<input
						className="
						outline-none 
						p-2
						text-gray-400
						border border-gray-300
						focus:ring focus:ring-primary focus:border-transparent
					"
						type="number"
						// defaultValue={0}
						name="offerPrice"
						value={productValue.offerPrice}
						onChange={handleChange}
					/>
				</div>
			</div>

			<Button type="submit" className="self-start px-10" disabled={state.uploading}>
				{ state.uploading ? "Uploading...." : "Add"}
			</Button>
		</form>
	);
};

export default AddProduct;

// for(let i=0; i < imgFiles.length; i++) {
// 	formData.append('images',imgFiles[i])
// }
