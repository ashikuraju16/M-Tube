const loadingDetails = async () => {
	const res = await fetch(
		" https://openapi.programming-hero.com/api/videos/categories",
	);
	const data = await res.json();
	const phones = data.data;
	displayItems(phones);
};

const displayItems = (phones) => {
	console.log(phones);
	const buttonItems = document.getElementById("button-items");
	let currentButton = null;

	phones.forEach((element) => {
		const button = document.createElement("button");
		button.classList = "btn text-xl";
		button.innerText = element.category;
		buttonItems.appendChild(button);

		button.addEventListener("click", () => {
			// Reset background and text color for the previously clicked button
			if (currentButton !== null) {
				currentButton.style.backgroundColor = "";
				currentButton.style.color = "";
			}

			// Change background and text color for the clicked button
			button.style.backgroundColor = "red";
			button.style.color = "white";

			// Set the current button to the clicked button
			currentButton = button;
		});
	});
};

const itemsDetails = async () => {
	const res = await fetch(
		"https://openapi.programming-hero.com/api/videos/category/1000",
	);
	const data = await res.json();
	const items = data.data;
	displayCard(items);
};
const displayCard = (items) => {
	console.log("items", items);
	const itemsContainer = document.getElementById("items-container");
	
	items.forEach((item) => {
		console.log("individual item", item);
		const itemsCard = document.createElement("div");
		itemsCard.classList = `card  bg-base-100 shadow-xl `;
		itemsCard.innerHTML = `
    <figure>
    <img class="h-72 rounded-lg object-cover w-full " src="${item.thumbnail}" alt="Shoes" />
  </figure>
  <div class="card-body flex flex-row">
  <div><img class="w-8 h-8 rounded-full"  src="${item.authors[0].profile_picture}" alt="Shoes" /></div>
 <div class=" pl-3 gap-y-6 space-y-3">
 <h2 class="text-3xl font-extrabold">${item.title}</h2>
 <h2>name</h2>
 <h2>name</h2>
 </div>
  </div>
    `;
		itemsContainer.appendChild(itemsCard);
	});
};

itemsDetails();
loadingDetails();
