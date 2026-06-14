const reveals = document.querySelectorAll(".reveal");
const modal = document.getElementById("gradeModal");

window.addEventListener("scroll", () => {
    reveals.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const visible = 150;

        if(top < window.innerHeight - visible){
            section.classList.add("active");
        }
    });
});
function openGrade(imagePath){
    document.getElementById("modalImage").src = imagePath;
    document
        .getElementById("gradeModal")
        .classList.add("active");
}
function closeGrade(){
    document
        .getElementById("gradeModal")
        .classList.remove("active");
}
modal.addEventListener("click", function(e){
    if(e.target === modal){
        modal.classList.remove("active");
    }
});

const WEBHOOK_URL = "https://discord.com/api/webhooks/1515807250717872329/CyHWwu1VdbCPbz_QwURGyxfxNqr1-suAC8z3AYVQH8Q879gh7nD9Lgr8KAvLQbX-UWte";
const recrutementForm = document.getElementById("recrutementForm");

if (recrutementForm) {
    recrutementForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const data = {
            nomrp: document.getElementById("nomrp").value,
            agerp: document.getElementById("agerp").value,
            discord: document.getElementById("discord").value,
            heures: document.getElementById("heures").value,
            disponibilites: document.getElementById("disponibilites").value,
            experience: document.getElementById("experience").value,
            motivations: document.getElementById("motivations").value,
            history: document.getElementById("history").value
        };
        const payload = {
            embeds: [{
                title: "📜 Nouvelle candidature",
                color: 0xD4AF37,
                fields: [
                    {
                        name: "Nom RP",
                        value: String(data.nomrp || "Non renseigné"),
                        inline: true
                    },
                    {
                        name: "Âge RP",
                        value: String(data.agerp || "Non renseigné"),
                        inline: true
                    },
                    {
                        name: "Discord",
                        value: String(data.discord || "Non renseigné")
                    },
                    {
                        name: "Heures FiveM",
                        value: String(data.heures || "0"),
                        inline: true
                    },
                    {
                        name: "Disponibilités",
                        value: String(data.disponibilites || "Non renseigné"),
                        inline: true
                    },
                    {
                        name: "Expérience RP",
                        value: String(data.experience || "Non renseigné")
                    },
                    {
                        name: "Motivations",
                        value: String(data.motivations || "Non renseigné")
                    },
                    {
                        name: "Histoire du personnage",
                        value: String(data.history || "Non renseigné")
                    }
                ],
                footer: {
                    text: "Légion des Cendres"
                },
                timestamp: new Date().toISOString()
            }]
        };
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if(response.ok){
                alert("Votre candidature a été envoyée.");
                recrutementForm.reset();
            } else {
                alert("Erreur lors de l'envoi.");
            }
        } catch(error) {
            console.error(error);
            alert("Impossible d'envoyer la candidature.");
        }
    });
}

const selected = document.querySelector(".selected");
const options = document.querySelector(".options");
const hiddenInput = document.getElementById("disponibilites");

selected.addEventListener("click", () => {
    options.classList.toggle("active");
});

document.querySelectorAll(".options div").forEach(option => {
    option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;
        options.classList.remove("active");
    });
});

document.addEventListener("click", (e) => {
    if(!e.target.closest(".custom-select")){
        options.classList.remove("active");
    }

});
