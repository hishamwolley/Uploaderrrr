chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	let urlsToExtract = request.msg;
	const urlLines = urlsToExtract.split("\n");
	for (const url of urlLines) {
		urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(url);
		const hostname = urlParts[1];
		// console.log(hostname);

		if (url == "") {
			continue;
		}
		await chrome.tabs.create(
			{
				url: "https://bodhi.carma.com/articles/new",
				active: false,
			},
			(tab) => {
				chrome.tabs.executeScript(
					tab.id,
					{
						file: "./content.js",
					},
					() => {
						chrome.tabs.sendMessage(tab.id, { data: url, hostname: hostname });
					}
				);
			}
		);
	}
});
