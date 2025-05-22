document.addEventListener("DOMContentLoaded", () => {
    let data = null;

    const form = document.getElementById("contact-form");
    const saveButton = document.getElementById("contact-save");

    // Load from data.json first
    fetch('data.json')
        .then(response => response.json())
        .then(d => {
            // If localStorage has saved data, use that instead
            data = window.localStorage.getItem("data")
                ? JSON.parse(window.localStorage.getItem("data"))
                : d;

            initializePage();  // ✅ initialize once data is loaded
        });

    function initializePage() {
        // Fill inputs
        form.getElementsByTagName("input")[0].value = data.contact[0].text;
        form.getElementsByTagName("input")[1].value = data.contact[1].text;
        form.getElementsByTagName("input")[2].value = data.contact[2].text;

        document.getElementById("instagram").innerText = data.socialMedia[0].text;
        document.getElementById("tiktok").innerText = data.socialMedia[1].text;
        document.getElementById("github").innerText = data.socialMedia[2].text;

        document.getElementById("education").innerHTML = data.education.map(item => `<p><strong>${item.period}</strong><br> ${item.school}</p>`).join("");
        document.getElementById("skill").innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join("");
        document.getElementById("experience").innerHTML = data.workExperience.map(exp => `<p><strong>${exp.title}</strong><br> ${exp.details}</p>`).join("");
        document.getElementById("language").innerHTML = data.languages.map(lang => `<li>${lang}</li>`).join("");
        document.getElementById("project").innerHTML = data.projects.map(proj => `<p><strong>${proj.name}</strong><br> ${proj.description}</p>`).join("");
        document.getElementById("certification").innerHTML = data.certifications.map(cert => `<p><strong>${cert.name}</strong><br> ${cert.description}</p>`).join("");
        document.getElementById("reference").innerHTML = `<p>${data.reference}</p>`;
        document.getElementById("profile-info").innerHTML = `<p>${data.profile}</p>`;

        saveButton.addEventListener("click", () => {
            if (saveButton.textContent === "Edit") {
                saveButton.textContent = "Save";
                document.querySelector('fieldset').disabled = false;
            } else {
                form.requestSubmit(); // Trigger form submission
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            data.contact[0].text = form.getElementsByTagName("input")[0].value;
            data.contact[1].text = form.getElementsByTagName("input")[1].value;
            data.contact[2].text = form.getElementsByTagName("input")[2].value;
            localStorage.setItem("data", JSON.stringify(data));
            saveButton.textContent = "Edit";
            document.querySelector('fieldset').disabled = true;
        });

        document.getElementById("instagram-edit").addEventListener("click", () => {
            const newValue = prompt("Enter new value", data.socialMedia[0].text);
            data.socialMedia[0].text = newValue;
            document.getElementById("instagram").textContent = newValue;
            window.localStorage.setItem("data", JSON.stringify(data));
        });

        document.getElementById("tiktok-edit").addEventListener("click", () => {
            const newValue = prompt("Enter new value", data.socialMedia[1].text);
            data.socialMedia[1].text = newValue;
            document.getElementById("tiktok").textContent = newValue;
            window.localStorage.setItem("data", JSON.stringify(data));
        });

        document.getElementById("github-edit").addEventListener("click", () => {
            const newValue = prompt("Enter new value", data.socialMedia[2].text);
            data.socialMedia[2].text = newValue;
            document.getElementById("github").textContent = newValue;
            window.localStorage.setItem("data", JSON.stringify(data));
        });

        document.getElementById("profile-reset").addEventListener("click", () => {
            window.localStorage.clear();
            location.reload();
        });

        document.getElementById("skill-input")?.addEventListener("change", () => addSkill());
        document.getElementById("language-input")?.addEventListener("change", () => addLanguage());
    }

    function addSkill() {
        const skill = document.getElementById("skill-input").value;
        document.getElementById("skill").innerHTML += `<li>${skill}</li>`;
        data.skills.push(skill);
        localStorage.setItem("data", JSON.stringify(data));
    }

    function addLanguage() {
        const language = document.getElementById("language-input").value;
        document.getElementById("language").innerHTML += `<li>${language}</li>`;
        data.languages.push(language);
        localStorage.setItem("data", JSON.stringify(data));
    }
});
