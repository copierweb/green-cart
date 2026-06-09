const Button = ({
	children,
	className = "",
	onClick,
	type = "button",
	variant="primary",
	disabled = false,
	iconLeft,
	iconRight,
	...props
}) => {

	const variants = {
		primary: "bg-primary text-white rounded-md hover:bg-primary-dull",
		secondary: "bg-primary text-white rounded-full hover:bg-primary-dull ",
		outline: "bg-gray-200 text-primary border border-primary hover:ring-2 hover:ring-red-900 hover:border-transparent rounded-md"
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
				text-sm 
				py-4 px-6
				shadow-lg
				cursor-pointer
				transition-all duration-300
				disabled:opacity-50 disabled:pointer-events-none
				flex items-center gap-2
				${variants[variant]}
				${className}
			`}
			{...props}
		>
			{iconLeft && iconLeft}
			{children}
			{iconRight && iconRight}
			
		</button>
	);
};

export default Button;
