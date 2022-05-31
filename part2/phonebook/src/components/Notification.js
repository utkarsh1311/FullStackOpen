const Notification = ({ message, type }) => {
	if (message == null) {
		return null;
	}

	return <div className={`message ${type}`}>{message}</div>;
};

export default Notification;
