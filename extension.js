const sendUrl = (e) => {
	e.preventDefault();
	const urlsToExtract = document.getElementById("url-textarea").value;

	chrome.runtime.sendMessage({
		msg: urlsToExtract,
		data: {
			subject: "Loading",
			content: "Just completed!",
		},
	});
};

document.getElementById("btn").addEventListener("click", sendUrl);
