const loadingPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;

  displayPhone(phones);
};

const displayPhone = (phones) => {
  console.log(phones);
  const phoneContainer = document.getElementById("phone-contanier");

  phoneContainer.textContent = "";

  phones.forEach((phone) => {
    console.log(phone);

    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-x`;
    phoneCard.innerHTML = `
      
    <figure class="px-10 pt-10">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title text-black">${phone.phone_name}</h2>
    <p class=" text-black">${phone.slug}</p>
    <div class="card-actions">
      <button class="btn btn-primary text-white hover:bg-blue-700">Show Detail</button>
    </div>
  </div>
      `;

    phoneContainer.appendChild(phoneCard);
  });

  // loading bar
  loadingSpinner(false);
};

const itemsSearch = () => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  console.log(searchText);
  loadingPhone(searchText);
  searchField.value = "";
};
// loading bar
const loadingSpinner = (isLoading) => {
  const loadingBar = document.getElementById("loading-bar");
  if (isLoading) {
    loadingBar.classList.remove("hidden");
  } else {
    loadingBar.classList.add("hidden");
  }
};

// loadingPhone();
