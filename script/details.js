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
  let currentButton = null;

  phones.forEach((element) => {
    const button = document.createElement("button");
    button.className = "btn";
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
loadingDetails();
