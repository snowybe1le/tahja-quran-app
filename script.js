const surahList = document.getElementById("surah-list");
const output = document.getElementById("output");
const inputSurahName = document.getElementById("input-surah-name");
const searchBtn = document.getElementById("search-btn");

const surahAPI = "http://api.alquran.cloud/v1/surah";
let surahArray = [];
let selectedSurah = {};

const fetchSurah = async () => {
    try {
        const res = await fetch(surahAPI);
        const surah = await res.json();
        //console.log(surah);

        surahArray = surah.data;
        console.log(surahArray);
        const word = surahArray[0].name.split(" ");
        console.log(word[1]);
        displaySurahList();
      
    } catch (err) {
        console.log(err);
    }
  };
  
fetchSurah();

const displaySurahList = () => {
    surahArray.forEach(surah => {
        const { number, englishName, name } = surah;
        const arabicFullName = name.split(" ");
        //console.log(arabicFullName.length);
        //console.log(arabicName);

        const surahDiv = document.createElement("div");
        surahDiv.className = "surah-div";
        surahDiv.id = englishName;

        surahDiv.innerHTML = `
        <span class="english-name">${number}. ${englishName}</span> 
        <span class="arabic-name">${arabicFullName.length === 3 ? `${arabicFullName[1]} ${arabicFullName[2]}` : arabicFullName[1]}</span>
        `
        surahDiv.addEventListener("click", () => {
            window.location.href = `surahPage.html?surahNumber=${number}`;
        });

        surahList.appendChild(surahDiv);
    });
}

const searchSurah = (index) => {
    const { number, englishName, name } = surahArray[index];
    const arabicFullName = name.split(" ");

    const surahDiv = document.createElement("div");
    surahDiv.className = "surah-div";
    surahDiv.id = englishName;

    surahDiv.innerHTML = `
    <span class="english-name">${number}. ${englishName}</span> 
    <span class="arabic-name">${arabicFullName.length === 3 ? `${arabicFullName[1]} ${arabicFullName[2]}` : arabicFullName[1]}</span>
    `
    surahDiv.addEventListener("click", () => {
        window.location.href = `surahPage.html?surahNumber=${number}`;
    });

    //output.style.height = "80px";
    output.appendChild(surahDiv);
}

inputSurahName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        output.innerHTML = "";
        const inputValue = inputSurahName.value;
        let surahIndex;

        if (!inputValue) {
            alert("Please enter a Surah name or number!");
        }
        else {
            if (isNaN(inputValue)) {
                surahIndex = surahArray.findIndex(surah => surah.englishName === inputValue);
            }
            else {
                surahIndex = parseInt(inputValue) - 1;
            }

            if (surahIndex === -1 || surahIndex > surahArray.length - 1) {
                output.textContent = "No Surah Found.";
                return;
            }

            searchSurah(surahIndex); 
        }
    }
});
