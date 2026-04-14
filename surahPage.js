const param = new URLSearchParams(window.location.search);
const surahNumber = param.get("surahNumber");
//console.log(surahNumber, typeof(surahNumber));

const surahName = document.getElementById("surah-name");
const displayAyahDiv = document.getElementById("display-ayah-div");
const signDiv = document.getElementById("sign-div");
const ayahsListDiv = document.getElementById("ayahs-list-div");

const surahAPI = "https://api.alquran.cloud/v1/surah/" + surahNumber;
let surahData = {};
let ayahsArray = [];
let ayahSelectedArray = [];
let ayahNumber = 0;
let wordNumber = 0;

const fetchSelectedSurah = async () => {
    try {
        const res = await fetch(surahAPI);
        const surah = await res.json();
        surahData = surah.data;

        console.log(surahData);
        displaySelectedSurah();

    } catch (err) {
        console.log(err);
    }
};

fetchSelectedSurah();

const displaySelectedSurah = () => {
    const { name, ayahs } = surahData;
    ayahsArray = ayahs;
    console.log(ayahs);
    const arabicFullName = name.split(" ");

    surahName.textContent = `${arabicFullName[1]}`;
    //const placeholderText = ayahs[0].text.split(" ");
    //displayAyahDiv.textContent = `${placeholderText[0]}`; //default display first ayah

    ayahs.forEach((ayah, index) => {
        const { text } = ayah;

        const ayahDiv = document.createElement("div");
        ayahDiv.className = "ayah-div";
        ayahDiv.textContent = `${text}`;

        ayahDiv.addEventListener("click", () => {
            ayahNumber = index;
            wordNumber = 0;
            ayahSelectedArray = text.split(" ");
            console.log(ayahSelectedArray);
            displayAyahDiv.textContent = `${ayahSelectedArray[wordNumber]}`;
            document.querySelectorAll(".ayah-div").forEach(div => div.style.backgroundColor = "#fdfeff");
            ayahDiv.style.backgroundColor = "#c6ecff"; //blue for selected
        });

        ayahsListDiv.appendChild(ayahDiv);
    })
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        const allAyahDivs = document.querySelectorAll(".ayah-div");

        if (wordNumber < ayahSelectedArray.length - 1) {
            //console.log(ayahNumber);
            
            wordNumber += 1;
            //console.log(ayahSelectedArray[wordNumber]);
            displayAyahDiv.textContent = `${ayahSelectedArray[wordNumber]}`;
        }
        else {
            allAyahDivs[ayahNumber].style.backgroundColor = "#86f689";
            setTimeout(() => allAyahDivs[ayahNumber].style.backgroundColor = "#fdfeff", 500); //set back to original colour

            setTimeout(() => {
                ayahNumber += 1;
                wordNumber = 0;
                allAyahDivs[ayahNumber].style.backgroundColor = "#c6ecff";
                ayahSelectedArray = ayahsArray[ayahNumber].text.split(" ");
                displayAyahDiv.textContent = `${ayahSelectedArray[wordNumber]}`;
                console.log(ayahSelectedArray);
            }, 1000);
        }
        
    }
})
