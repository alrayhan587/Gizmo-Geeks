const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const info = await res.json();
    const phones = info.data;
    displayPhone(phones, isShowAll);
    displayNumbers(phones);


}

const displayNumbers = phones => {
    const phoneNumberField = document.getElementById("phone-numbers-field");
    phoneNumberField.textContent = "";
    const phoneNumber = document.createElement("div");
    phoneNumber.innerHTML = `<p class="my-4 text-sm text-center text-gray-400">${phones.length} results found</p>`;
    phoneNumberField.appendChild(phoneNumber);

}

const displayPhone = (phones, isShowAll) => {
    // console.log(phones);
    // step 1: take the container
    const PhoneContainer = document.getElementById('phone-container');


    //problem: clear the container data before adding new data to the container
    PhoneContainer.textContent = "";

    const showAllContainer = document.getElementById('show-all-container');
    // iF there are more than 12 phones in the container
    if ((phones.length > 12) && !isShowAll) {
        showAllContainer.classList.remove('hidden');

    }
    else {
        showAllContainer.classList.add('hidden');
    }


    // display only 12 phone if isShowAll=true
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }



    phones.forEach(phone => {
        // console.log(phone);

        //step 2: Create a new div
        const PhoneCard = document.createElement('div');
        PhoneCard.classList = `card  bg-base-100 shadow-xl`;




        // step 3: set the inner Html value for the card;
        PhoneCard.innerHTML = `
        
        <figure class=" h-60 "><img
        src="${phone.image}" class="w-24"
        alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p class="text-sm text-gray-400">${phone.slug}</p>
            <div class="card-actions justify-center mt-4">
                 <button onclick="handleShowDetail('${phone.slug}')" class="w-full btn">Show Details</button>
            </div>
        </div>`;

        //step 4:append the child elements
        PhoneContainer.appendChild(PhoneCard);



        const footerSection = document.getElementById('footer-section');
        if (phones.length > 0) {
            footerSection.classList.remove('hidden');
        }

    });
    //hiding loading section
    toggleLoadingSpinner(false);
}

//handling show Detail function
handleShowDetail = async (id) => {
    // console.log("Clicked Show Detail");
    //loading single ph9one data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    // console.log(data);
    // console.log(data.data.name);
    showModalDetails(data);
}


const showModalDetails = (phone) => {
    Show_Detail_modal.showModal()

    console.log(phone);
    // console.log(phone.data.brand);
    // console.log(phone.name);


    // selecting the phone name section
    const ShowDetailPhoneName = document.getElementById("show-detail-phone-name");
    ShowDetailPhoneName.innerHTML = `
    <div class="card  w-96 mx-auto bg-base-100">
        <figure class="w-32 mx-auto"><img  src="${phone.data.image}" alt="Shoes" /></figure>
        <div class="  card-body">
            <h2 class="card-title"> ${phone.data.name}</h2>
      <p> <br> ${phone.data.mainFeatures.storage}  <br> ${phone.data.mainFeatures.displaySize}</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">${phone.data.brand}</div> 
        <div class="badge badge-outline">Products</div>
      </div>

      <div class="w-1/4 mx-auto modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Order</button>
            </form>
        </div>
    </div>
  </div>`;



}
// handling the search button
const handleSearch = (isShowAll) => {
    // console.log("Handling the search button");

    // step 1:taking the value input into the search field;
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    // step 2:now taking the search value load this value into the url of the search field
    loadPhone(searchText, isShowAll);
    toggleLoadingSpinner(true)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    }
    else {
        loadingSpinner.classList.add("hidden");
    }


}

// handle show all button
const handleShowAllButton = () => {
    handleSearch(true);
}
// const showAllContainer =document.getElementById("show-all-container");
