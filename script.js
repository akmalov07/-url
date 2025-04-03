async function millatniTop() {
    let ism = document.getElementById("ismKiritish").value;
    if (!ism) {
        alert("Iltimos, ism kiriting!");
        return;
    }

    let response = await fetch(`https://api.nationalize.io/?name=${ism}`);
    let malumot = await response.json();

    let natijaDiv = document.getElementById("natija");
    natijaDiv.innerHTML = "";

    if (malumot.country.length === 0) {
        natijaDiv.innerHTML = "<p>Ma'lumot topilmadi.</p>";
        return;
    }

    malumot.country.forEach(mamlakat => {
        let kod = mamlakat.country_id.toLowerCase();
        let ehtimollik = (mamlakat.probability * 100).toFixed(2);

        let bayroqDiv = document.createElement("div");
        bayroqDiv.className = "bayroq";
        bayroqDiv.innerHTML = `
            <p>${mamlakat.country_id}: ${ehtimollik}%</p>
            <img src="https://flagcdn.com/w40/${kod}.png" alt="${mamlakat.country_id} bayrog'i">
        `;
        natijaDiv.appendChild(bayroqDiv);
    });
}
