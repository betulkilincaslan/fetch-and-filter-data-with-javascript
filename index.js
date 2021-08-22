let data = [];

const fetchData = () => {
  // Fetching data from data.json file
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //json data
      data = responseData;
      // Show listing options after click get button
      let listingOptions = document.querySelector(".table");
      listingOptions.classList.toggle("d-none");
      // Function for listing data in HTML
      listData(responseData);
    })
    .catch((err) => {
      // Error handling
      console.log(err);
      alert("Bir hata oluştu!");
    });
};
// Function for listing elements
const listData = (data) => {
  let list = document.querySelector(".list");
  list.classList.add("fw-bold");
  let showInfos = data.map((element) => {
    return `
        <li class="d-flex flex-column" id=${element.id}>
        <span>Name : ${element.name} </span> 
        <span>Age : ${element.age}</span>
        <span>IsActive : ${element.isActive}</span>
        <span>email : ${element.email}</span>
        </li> <br />
        `;
  });
  showInfos = showInfos.join("");
  list.innerHTML = showInfos;
};

// Filtering Data Function
let filterButton = document.querySelector("#filterButton");

filterButton.addEventListener(
  "click",
  (filterData = () => {
    let cbAdultChecked = document.querySelector("#cbAdult").checked;
    let cbActiveChecked = document.querySelector("#cbActive").checked;
    let inputValue = document.querySelector("#inputValue").value;
    let filteredData = data;

    if (cbAdultChecked) {
      filteredData = data.filter((item) => item.age >= 18);
    }
    if (cbActiveChecked) {
      filteredData = data.filter((item) => item.isActive === true);
    }
    if (cbAdultChecked && cbActiveChecked) {
      filteredData = data.filter(
        (item) => item.isActive === true && item.age >= 18
      );
    }
    if (inputValue) {
      filteredData = data.filter(
        (item) => item.name.charAt(0).toUpperCase() === inputValue.toUpperCase()
      );
    }
    if (cbAdultChecked && inputValue && !cbActiveChecked) {
      filteredData = data
        .filter(
          (item) =>
            item.name.charAt(0).toUpperCase() === inputValue.toUpperCase()
        )
        .filter((item) => item.age >= 18);
    }
    if (cbActiveChecked && inputValue && !cbAdultChecked) {
      filteredData = data
        .filter(
          (item) =>
            item.name.charAt(0).toUpperCase() === inputValue.toUpperCase()
        )
        .filter((item) => item.isActive === true);
    }
    if (cbAdultChecked && cbActiveChecked && inputValue) {
      filteredData = data
        .filter(
          (item) =>
            item.name.charAt(0).toUpperCase() === inputValue.toUpperCase()
        )
        .filter((item) => item.isActive === true && item.age >= 18);
    }
    listData(filteredData);
  })
);
