let currentCategoryId = 1000;
let isSorted = true;

// loading bar
const loadingSpinner = (isLoading) => {
  const loadingBar = document.getElementById("loading-bar");
  if (isLoading) {
    loadingBar.classList.remove("hidden");
  } else {
    loadingBar.classList.add("hidden");
  }
};

const loadingDetails = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categories = data.data;
  displayItems(categories);
};

const displayItems = (categories) => {
  const buttonItems = document.getElementById("button-items");
  let currentButton = null;

  categories.forEach((element) => {
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
      currentCategoryId = element.category_id;
      itemsDetails();
    });
  });
};
const itemsDetails = async () => {
  loadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${currentCategoryId}`
  );
  const data = await res.json();
  loadingSpinner(false);
  const items = data.data;
  if (isSorted) {
  const sortedItems=items.sort((a, b) =>parseFloat(b.others.views) - parseFloat(a.others.views));
  console.log(sortedItems);

    displayCard(sortedItems);
  } else {
    displayCard(items);
  }
};

const sortCards = (items) => {
  const sortButton = document.getElementById("sort-button");
  sortButton.addEventListener("click", (e) => {
    itemsDetails();
  });
};

sortCards();

const displayCard = (items) => {
  const itemsContainer = document.getElementById("items-container");
  if (items.length === 0) {
    itemsContainer.classList =
      "text-7xl flex justify-center my-44 font-extrabold";
    itemsContainer.innerHTML = `
	<div class="">
	<img class=" mx-auto mb-16" src="./Icon.png" alt="" />
	<p class="max-sm:text-2xl w-3/4 text-center   mx-auto  max-sm:text-center max-md:text-3xl max-lg:text-4xl max-xl:text-4xl">Oops!! Sorry, There is no content here</p>
	</div>
       `;
    return;
  }

  itemsContainer.innerHTML = "";

  items.forEach((item) => {
    const itemsCard = document.createElement("div");
    itemsCard.classList = `card  bg-base-100`;
    itemsCard.innerHTML = `
    <figure>
    <img class="h-72 rounded-lg object-cover w-full " src="${
      item.thumbnail
    }" alt="Shoes" />
  </figure>
  <div class="card-body flex flex-row">
  <div><img class="w-10 h-10 rounded-full"  src="${
    item.authors[0].profile_picture
  }" alt="Shoes" /></div>
 <div class=" pl-3 gap-y-6 space-y-3">
 <h2 class="text-3xl font-extrabold max-sm:text-xl max-lg:text-2xl max-xl:text-2xl max-2xl:text-2xl">${
   item.title
 }</h2>
 <div class="flex gap-x-2">
 <h2 class="text-xl max-xl:text-lg">${item.authors[0].profile_name}</h2>
 <h2 class="text-xl text-blue-700">${
   item.authors[0].verified === true
     ? '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m23 12l-2.44-2.79l.34-3.69l-3.61-.82l-1.89-3.2L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5l.34 3.7L1 12l2.44 2.79l-.34 3.7l3.61.82L8.6 22.5l3.4-1.47l3.4 1.46l1.89-3.19l3.61-.82l-.34-3.69zM9.38 16.01L7 13.61a.996.996 0 0 1 0-1.41l.07-.07c.39-.39 1.03-.39 1.42 0l1.61 1.62l5.15-5.16c.39-.39 1.03-.39 1.42 0l.07.07c.39.39.39 1.02 0 1.41l-5.92 5.94c-.41.39-1.04.39-1.44 0" /></svg>'
     : ""
 }</h2>
 </div>
 <h2 class="text-lg">${item.others.views}</h2>
 </div>
 </div>
    `;
    itemsContainer.appendChild(itemsCard);
  });
};

itemsDetails();
loadingDetails();
