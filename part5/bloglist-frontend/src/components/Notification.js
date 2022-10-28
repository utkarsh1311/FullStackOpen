const Notification = ({ type, info }) => {
	if (type === "error") {
		return (
			<div
				style={{
					border: "2px solid red",
					background: "#cccccc",
					padding: "5px",
					color: "red",
					borderRadius: "5px"
				}}>
				<h3>{info}</h3>
			</div>
		);
	} else if (type === "success") {
		return (
			<div
				style={{
					border: "2px solid green",
					background: "#cccccc",
					padding: "5px",
					color: "green",
					borderRadius: "5px"
				}}>
				<h3>{info}</h3>
			</div>
		);
	}
};

export default Notification;
