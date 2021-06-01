const selectedseats = document.getElementById("seatsSelected");
const totalvalue = document.getElementById("totalValue");
const selectedmovie = document.getElementById("movie");
const container = document.querySelector(".container");
const allseats = document.querySelectorAll(".row .seat:not(.occupied)");
let seatstoremove;
const button = document.querySelector(".btn");
let count, selectedseatsbycustumer, seatsindex;

populateui();

function populateui()
{
    const objectofselectedseats = JSON.parse(localStorage.getItem("seatsselected"));

    if (objectofselectedseats != null && objectofselectedseats.length > 0)
    {
        allseats.forEach(function (seats, index)
        {
            if (objectofselectedseats.indexOf(index) > -1)
            {
                seats.classList.add("selected");
            }
        });
    }
    const selectedmoviefromstorage = localStorage.getItem("selectedmovie");
    if (selectedmovie !== null)
    {
        selectedmovie.selectedIndex = selectedmoviefromstorage;
    }
    updateSeatsAndCount();
}

// mouse event listener

function setitemtostorage(value, index)
{
    localStorage.setItem("selectedmovieprice", value);
    localStorage.setItem("selectedmovie", index);
}

selectedmovie.addEventListener("change", function (e)
{
    updateSeatsAndCount();
    setitemtostorage(e.target.value, e.target.selectedIndex);
});

// select event listener

function updateSeatsAndCount()
{
    selectedseatsbycustumer = document.querySelectorAll(".row .seat.selected");
    seatsindex = [...selectedseatsbycustumer].map(function (seats)
    {
        return [...allseats].indexOf(seats);
    });
    localStorage.setItem("seatsselected", JSON.stringify(seatsindex));
    count = selectedseatsbycustumer.length.toString();
    selectedseats.innerText = count;
    totalvalue.innerText = (count * selectedmovie.value).toString();
}

container.addEventListener("click", function (e)
{
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied"))
    {
        e.target.classList.toggle("selected");
        updateSeatsAndCount();
    }


});

//button event

button.addEventListener("click", function ()
{
    seatstoremove = document.querySelectorAll(".row .seat.selected");
    seatstoremove.forEach(function (seats)
    {
        if (seats.classList.contains("selected"))
        {
            seats.classList.remove("selected");
        }

    });
    updateSeatsAndCount();
});