const loadingDetails = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const phones = data.data;
  displayItems(phones);
};
const displayItems = (phones) => {
  console.log(phones);
  const buttonItems = document.getElementById("button-items");

  phones.forEach((element) => {
  const button=  document.createElement("button");
  button.className='btn'
    button.innerText= element.category
    buttonItems.appendChild(button)
  });
};

loadingDetails();
