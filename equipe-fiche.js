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
            <p class="fiche-infos"></p>
            <p class="fiche-citation"></p>
            <h3 class="fiche-sub-title fiche-personnalite-title">Personnalité</h3>
            <p class="fiche-personnalite"></p>
            <h3 class="fiche-sub-title fiche-description-title">Histoire</h3>
            <div class="fiche-description"></div>
        `;
        content.querySelector("h2").textContent = membre.nom;
        content.querySelector(".fiche-grade").textContent = membre.grade || "";

        // Âge + origine (n'affiche que ce qui existe)
        const infosEl = content.querySelector(".fiche-infos");
        const infos = [];
        if (membre.age) infos.push(`${membre.age} ans`);
        if (membre.origine) infos.push(membre.origine);
        if (infos.length > 0) {
            infosEl.textContent = infos.join(" — ");
        } else {
            infosEl.remove();
        }

        // Citation (affichée uniquement si elle existe)
        const citationEl = content.querySelector(".fiche-citation");
        if (membre.citation) {
            citationEl.textContent = `« ${membre.citation} »`;
        } else {
            citationEl.remove();
        }

        // Personnalité (masquée si absente)
        const personnaliteTitleEl = content.querySelector(".fiche-personnalite-title");
        const personnaliteEl = content.querySelector(".fiche-personnalite");
        if (membre.personnalite) {
            personnaliteEl.textContent = membre.personnalite;
        } else {
            personnaliteTitleEl.remove();
            personnaliteEl.remove();
        }

        // Description / histoire (conserve les sauts de ligne du config.json)
        const descriptionTitleEl = content.querySelector(".fiche-description-title");
        const descriptionEl = content.querySelector(".fiche-description");
        if (membre.description) {
            membre.description.split("\n\n").forEach(paragraphe => {
                const p = document.createElement("p");
                p.textContent = paragraphe;
                descriptionEl.appendChild(p);
            });
        } else {
            descriptionTitleEl.remove();
            descriptionEl.remove();
        }

        card.innerHTML = "";
        card.appendChild(img);
        card.appendChild(content);
    } catch (error) {
        console.error("Erreur lors du chargement de la fiche :", error);
        card.innerHTML = "<p>Une erreur est survenue lors du chargement de la fiche.</p>";
    }
}

document.addEventListener("DOMContentLoaded", chargerFicheMembre);