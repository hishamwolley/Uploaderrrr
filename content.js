chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	const token = "9864d06a0b1bb1c428a1ae7e44951bfd";
	const apiUrl = "https://api.diffbot.com/v3/article";
	let outletId;
	let outletLang;
	let outletCountry;
	const outletUrl = request.hostname.replace("www.", "");

	try {
		await fetch(`https://bodhi.carma.com/outlets?q=${outletUrl}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.outlets);
				for (const outlet of data.outlets) {
					if (outlet.url === outletUrl) {
						outletId = outlet.id;
						outletLang = outlet.languages[0];
						outletCountry = outlet.location.country_code;
						console.log(outletLang);
						try {
							fetch(
								apiUrl +
									`?token=${token}&url=${encodeURIComponent(request.data)}`
							)
								.then((response) => response.json())
								.then((data) => {
									console.log(data);
									if (data) {
										const articleHeadline = data.objects[0].title;
										const articleUrl = data.objects[0].pageUrl;
										const articleText = data.objects[0].text;
										let fullText = document.getElementById(
											"article_content_plain"
										);
										fullText.value = articleText;
										const country = document.getElementById("article_country");
										let countryOption = document.createElement("option");
										countryOption.value = "outletCountry";
										countryOption.selected = "selected";
										country.appendChild(countryOption);
										const outlet = document.getElementById("article_outlet_id");
										let outletOption = document.createElement("option");
										outletOption.value = outletId;
										outletOption.selected = "selected";
										outlet.appendChild(outletOption);
										const sectionFields =
											document.getElementById("section-fields");
										let div11 = document.createElement("div");
										div11.class = "input-row";
										sectionFields.appendChild(div11);
										let div22 = document.createElement("div");
										div22.class = "input string article_language";
										div11.appendChild(div22);
										let languageSelect = document.createElement("select");
										languageSelect.name = "article[language]";
										languageSelect.id = "article_language";
										languageSelect.class = "selectized";
										div22.appendChild(languageSelect);
										let languageOption = document.createElement("option");
										languageOption.value = outletLang;
										languageSelect.appendChild(languageOption);
										const metadata = document.getElementById("metadata");
										let div1 = document.createElement("div");
										div1.class = "input-row";
										div1.id = "default-metadata";
										metadata.appendChild(div1);
										let div2 = document.createElement("div");
										div2.class = "input select article_url";
										div1.appendChild(div2);
										let url = document.createElement("input");
										url.id = "article_url";
										url.value = articleUrl;
										url.type = "text";
										url.name = "article[url]";
										div2.appendChild(url);
										document.getElementById("article_headline").value =
											articleHeadline;
										let option = document.createElement("option");
										option.value = "kpmg_uk_2020";
										option.selected = "selected";
										const select = document.getElementById("article_keywords");
										select.appendChild(option);
										document.getElementById("submit-article").click();
									}
								});
						} catch (err) {
							console.log(err);
							document.alert("error 403");
						}
					}
				}
			});
	} catch (err) {
		console.log(err);
		alert("error 403");
	}
});
