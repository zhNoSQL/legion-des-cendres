async function chargerFicheMembre() {
    const card = document.getElementById("ficheCard");
    if (!card) return;

    const segments = window.location.pathname.split("/").filter(Boolean);
    const fileName = segments[segments.length - 1] || "";
    const id = fileName.replace(/\.html$/i, "");

    try {
        const response = await fetch("../config.json");
        if (!response.ok) throw new Error("config.json introuvable");

        const data = await response.json();
        const membre = (data.membres || []).find(m => m.id === id);

        if (!membre) {
            card.innerHTML = "<p>Ce membre est introuvable. Vérifie l'identifiant dans config.json.</p>";
            return;
        }

        document.title = `${membre.nom} — La Légion des Cendres`;

        const img = document.createElement("img");
        img.src = `../${membre.image}`;
        img.alt = membre.nom;
        img.onerror = () => { img.src = "../assets/img/logo.png"; };

        const content = document.createElement("div");
        content.className = "fiche-content";
        content.innerHTML = `
            <h2></h2>
            <p class="fiche-grade"></p>
            <p class="fiche-description"></p>
        `;
        content.querySelector("h2").textContent = membre.nom;
        content.querySelector(".fiche-grade").textContent = membre.grade || "";
        content.querySelector(".fiche-description").textContent = membre.description || "";

        card.innerHTML = "";
        card.appendChild(img);
        card.appendChild(content);
    } catch (error) {
        console.error("Erreur lors du chargement de la fiche :", error);
        card.innerHTML = "<p>Une erreur est survenue lors du chargement de la fiche.</p>";
    }
}

document.addEventListener("DOMContentLoaded", chargerFicheMembre);