async function chargerEquipe() {
    const dropdown = document.getElementById("equipeDropdown");
    if (!dropdown) return;

    try {
        const response = await fetch("./config.json");
        if (!response.ok) throw new Error("config.json introuvable");

        const data = await response.json();
        const membres = data.membres || [];

        dropdown.innerHTML = "";

        if (membres.length === 0) {
            dropdown.innerHTML = '<li class="dropdown-empty">Aucun membre pour le moment</li>';
            return;
        }

        membres.forEach(membre => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.href = `./equipe/${membre.id}`;
            a.textContent = membre.nom;

            li.appendChild(a);
            dropdown.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur lors du chargement de l'équipe :", error);
        dropdown.innerHTML = '<li class="dropdown-empty">Erreur de chargement</li>';
    }
}

function initDropdown() {
    const toggles = document.querySelectorAll(".dropdown > a");

    toggles.forEach(toggle => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            const parent = toggle.parentElement;
            const wasOpen = parent.classList.contains("open");

            document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));

            if (!wasOpen) parent.classList.add("open");
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    chargerEquipe();
    initDropdown();
});