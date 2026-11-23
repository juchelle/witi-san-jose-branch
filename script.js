function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("menuOverlay");
    
    if (menu && overlay) {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
    
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("menuOverlay");
    if (menu && overlay) {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("facultySearchInput");
    const dropdown = document.getElementById("searchHistoryDropdown");

    if (searchInput && dropdown) {

        function getSearchHistory() {
            return JSON.parse(localStorage.getItem("witi_search_history")) || [];
        }

        function saveToSearchHistory(query) {
            let history = getSearchHistory();
            history = history.filter(item => item.toLowerCase() !== query.toLowerCase());
            history.unshift(query);
            if (history.length > 5) history.pop();
            localStorage.setItem("witi_search_history", JSON.stringify(history));
        }

        window.removeSearchHistoryItem = function (e, itemToRemove) {
            e.stopPropagation();
            let history = getSearchHistory();
            history = history.filter(item => item !== itemToRemove);
            localStorage.setItem("witi_search_history", JSON.stringify(history));
            renderDropdown();
        };

        function renderDropdown() {
            const history = getSearchHistory();

            if (history.length === 0) {
                dropdown.style.display = "none";
                return;
            }

            let html = "";
            history.forEach(item => {
                html += `
                    <div class="search-history-item" onclick="selectHistoryItem('${item}')">
                        <span class="history-text"> ⏱   ${item}</span>
                        <button class="remove-history-btn" onclick="removeSearchHistoryItem(event, '${item}')" title="Remove">&times;</button>
                    </div>
                `;
            });

            dropdown.innerHTML = html;
            dropdown.style.display = "block";
        }

        window.selectHistoryItem = function (value) {
            searchInput.value = value;
            dropdown.style.display = "none";
            executeSearch(value);
        };

        function executeSearch(query) {
            const filter = query.toLowerCase().trim();
            if (!filter) return;

            saveToSearchHistory(query);

            const personCards = document.querySelectorAll(".person-card");
            let matchedCard = null;

            personCards.forEach(card => {
                const name = card.querySelector(".person-info h3") ? card.querySelector(".person-info h3").textContent.toLowerCase() : "";
                const position = card.querySelector(".person-info .position") ? card.querySelector(".person-info .position").textContent.toLowerCase() : "";
                const cardText = card.textContent.toLowerCase();

                if ((name.includes(filter) || position.includes(filter) || cardText.includes(filter)) && !matchedCard) {
                    matchedCard = card;
                }
            });

            if (matchedCard) {
                matchedCard.click();
                searchInput.value = "";
            } else {
                const adminHeader = document.querySelector(".category-title");
                if ((filter.includes("admin") || filter.includes("staff")) && adminHeader) {
                    adminHeader.scrollIntoView({ behavior: "smooth", block: "start" });
                    searchInput.value = "";
                } else {
                    alert("No faculty or administrator found matching '" + filter + "'");
                }
            }
        }

        searchInput.addEventListener("focus", renderDropdown);

        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                dropdown.style.display = "none";
                executeSearch(searchInput.value);
            }
        });

        document.addEventListener("click", function (e) {
            if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });
    }

    // Makinig kung binago ang switch ng dark mode
    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener("change", function () {
            if (this.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        });
    }
});

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

const peopleDatabase = {
    "Necie A. Estorgio": {
        vacant: "8:00 AM - 5:00 PM",
        exp: "2 Years",
        fb: "https://www.facebook.com/necie.anasco.estorgio",
    },
    "Jayfferson Prado": {
        grade: "Grade 11 & Grade 12",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/jayfferson.prado.2025",
    },
    "Samantha Ayessa S. Mingao": {
        vacant: "8:00 AM - 5:00 PM",
        exp: "6 Years",
        fb: "https://www.facebook.com/sam.mingao",
    },
    "Deib Alburo": {
        vacant: "8:00 AM - 5:00 PM",
        exp: "5 Years",
        fb: "https://www.facebook.com/share/1MoufmZmxp/",
    },
    "Joel Marisga": {
        vacant: "8:00 AM - 6:00 PM",
        exp: "6 Years",
        fb: "https://www.facebook.com/joel.marisga.2025",
    },
    "Niel Marisga": {
        vacant: "8:00 AM - 6:00 PM",
        exp: "6 Years",
        fb: "https://www.facebook.com/profile.php?id=61590681141723",
    },
    "Gregorio Canja": {
        vacant: "8:00 AM - 6:00 PM",
        exp: "6 Years",
        fb: "https://www.facebook.com/share/19ujx3LgHQ/",
    },
    "Alvin Balmes De Luis": {
        grade: "Grade 11 & Grade 12",
        vacant: "9:00 AM - 10:00 AM",
        subject: "Computer Programming & CSS",
        section: "ICT - Alpha & Nexus",
        exp: "1 Year",
        fb: "https://www.facebook.com/share/1KQBqzzkn5/",
    },
    "El Edsteferson Sioson Gamido": {
        grade: "Grade 11 & Grade 12",
        vacant: "11:00 AM - 12:00 PM",
        subject: "LACS & RESEARCH",
        section: "Locke, Hydrogen, Einstein, Freud, Berkeley, Venture, Socrates, Emerson, Erikson",
        exp: "1 Year",
        fb: "https://www.facebook.com/share/1FPgoJNnR7/",
    },
    "Patrick Baylon": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/186vkUsAGv/",
    },
    "Oliver Domincil": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/1DRxDNF8Je/",
    },
    "Carlo Palad": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/1JJh2WbJwr/",
    },
    "Ron Justine J. Mangubat": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/19vukdxCPJ/",
    },
    "Joriel Untalan": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/19vukdxCPJ/",
    },
    "Charles Black": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/charles.black.655258",
    },
    "Feajen Grefiel": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/1Cc6bSqx6E/",
    },
    "Ara Gamit": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://facebook.com",
    },
    "Angela Amor Roldan": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/19NeHk6r5E/",
    },
    "Angela Dadaya": {
        grade: "Grade 12",
        vacant: "2:00 PM - 3:00 PM",
        subject: "Statistics and Probability",
        section: "Grade 12 - Zeta",
        exp: "3 Years",
        fb: "https://www.facebook.com/share/1DnpfDcsM9/",
    },
    "May Isabel M. Reyes": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/1C4As78NfG/",
    },
    "Mariel Malibiran": {
        grade: "Grade 11 & 12",
        vacant: "1:00 PM - 3:00 PM",
        subject: "Citizenship & Kasaysayan",
        section: "Locke, Hydrogen, Plato, Venture, Socrates, Emerson, Erikson, Alpha, Marx, Pierce",
        exp: "3 Years",
        fb: "https://www.facebook.com/marielyn.malibiran.2024?mibextid=ZbWKwL",
    },
    "Romina Herrera": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/1Do9yoqzfS/",
    },
    "Shiela Francisco": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/franciscoshielamae1234",
    },
    "Lilibeth Carbonel": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "Not Specified",
        fb: "https://www.facebook.com/share/18znm7D9Nz/",
    },
    "Darlene Mira": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "1 year",
        fb: "https://www.facebook.com/share/18znm7D9Nz/",
    },
    "Jessabel": {
        grade: "Not Specified",
        vacant: "Not Specified",
        subject: "Not Specified",
        section: "Not Specified",
        exp: "1 year",
        fb: "https://www.facebook.com/jessabel.delossantos.90",
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const personCards = document.querySelectorAll(".person-card");
    const personModal = document.getElementById("personModal");

    personCards.forEach(card => {
        card.addEventListener("click", function () {
            const imgSrc = this.querySelector(".person-photo img") ? this.querySelector(".person-photo img").src : "";
            const name = this.querySelector(".person-info h3") ? this.querySelector(".person-info h3").textContent.trim() : "";
            const position = this.querySelector(".person-info .position") ? this.querySelector(".person-info .position").textContent : "";
            const status = this.querySelector(".person-info span") ? this.querySelector(".person-info span").textContent : "";

            document.getElementById("modalPersonImg").src = imgSrc;
            document.getElementById("modalPersonName").textContent = name;
            document.getElementById("modalPersonPosition").textContent = position;
            document.getElementById("modalPersonStatus").textContent = "Status: " + status;

            const info = peopleDatabase[name] || {
                vacant: "Not Specified",
                exp: "1 Year",
                fb: "#",
                motto: "Dedicated to excellence."
            };

            function updateField(elementId, value) {
                const el = document.getElementById(elementId);
                const card = el ? el.closest('.detail-card') : null;
                if (value) {
                    el.textContent = value;
                    if (card) card.style.display = "block";
                } else {
                    if (card) card.style.display = "none";
                }
            }

            updateField("modalPersonGrade", info.grade);
            updateField("modalPersonVacant", info.vacant);
            updateField("modalPersonSubject", info.subject);
            updateField("modalPersonSection", info.section);
            updateField("modalPersonExp", info.exp);
            
            document.getElementById("modalPersonMotto").textContent = info.motto ? `"${info.motto}"` : "";
            
            const fbLink = document.getElementById("modalPersonFb");
            if (fbLink) {
                fbLink.href = info.fb;
            }

            if (personModal) {
                personModal.style.display = "flex";
            }
        });
    });
});

function closePersonModal() {
    const personModal = document.getElementById("personModal");
    if (personModal) {
        personModal.style.display = "none";
    }
}

window.onclick = function(event) {
    const personModal = document.getElementById("personModal");

    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }

    if (event.target === personModal) {
        personModal.style.display = "none";
    }
};


function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("menuOverlay");
    
    if (menu && overlay) {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}


let currentStep = 1;

function goToStep(targetStep) {
   
    if (targetStep > currentStep) {
        if (!validateStep(currentStep)) return;
    }

    
    document.getElementById(`step${currentStep}`).classList.remove("active-step");
    
    
    document.getElementById(`node${currentStep}`).classList.remove("active");
    if (targetStep > currentStep) {
        document.getElementById(`node${currentStep}`).classList.add("completed");
    }

    currentStep = targetStep;

    
    document.getElementById(`step${currentStep}`).classList.add("active-step");
    document.getElementById(`node${currentStep}`).classList.add("active");

    
    const fillPercent = ((currentStep - 1) / 3) * 100;
    document.getElementById("progressFill").style.width = `${fillPercent}%`;

    
    if (currentStep === 4) {
        populateReview();
    }
}


function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        const fullName = document.getElementById("fullName");
        const dob = document.getElementById("dob");
        const gender = document.getElementById("gender");

        if (!checkField(fullName)) isValid = false;
        if (!checkField(dob)) isValid = false;
        if (!checkField(gender)) isValid = false;
    } 
    else if (step === 2) {
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const address = document.getElementById("address");

        if (!checkEmail(email)) isValid = false;
        if (!checkPhone(phone)) isValid = false;
        if (!checkField(address)) isValid = false;
    } 
    else if (step === 3) {
        const course = document.getElementById("course");
        const yearLevel = document.getElementById("yearLevel");

        if (!checkField(course)) isValid = false;
        if (!checkField(yearLevel)) isValid = false;
    }

    return isValid;
}

function checkField(input) {
    if (!input || input.value.trim() === "") {
        markError(input);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

function checkEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input || !emailRegex.test(input.value.trim())) {
        markError(input);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

function checkPhone(input) {
    const phoneRegex = /^09\d{9}$/;
    if (!input || !phoneRegex.test(input.value.trim())) {
        markError(input);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

function markError(input) {
    if (input && input.parentElement) {
        input.parentElement.classList.add("error");
    }
}

function clearError(input) {
    if (input && input.parentElement) {
        input.parentElement.classList.remove("error");
    }
}


function populateReview() {
    document.getElementById("revName").textContent = document.getElementById("fullName").value || "-";
    document.getElementById("revDobGender").textContent = `${document.getElementById("dob").value} (${document.getElementById("gender").value})`;
    document.getElementById("revEmail").textContent = document.getElementById("email").value || "-";
    document.getElementById("revPhone").textContent = document.getElementById("phone").value || "-";
    document.getElementById("revAddress").textContent = document.getElementById("address").value || "-";
    
    const courseSelect = document.getElementById("course");
    document.getElementById("revCourse").textContent = courseSelect.options[courseSelect.selectedIndex]?.text || "-";
    
    document.getElementById("revYear").textContent = document.getElementById("yearLevel").value || "-";
}


document.addEventListener("DOMContentLoaded", () => {
    const luxuryForm = document.getElementById("luxuryForm");
    const successCard = document.getElementById("enrollSuccessCard");

    if (luxuryForm) {
        luxuryForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (validateStep(1) && validateStep(2) && validateStep(3)) {
                
                const courseSelect = document.getElementById("course");
                const newEnrollee = {
                    name: document.getElementById("fullName").value,
                    email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                    course: courseSelect ? courseSelect.options[courseSelect.selectedIndex].text : "",
                    yearLevel: document.getElementById("yearLevel").value,
                    date: new Date().toLocaleDateString()
                };

                let enrolledList = JSON.parse(localStorage.getItem("witiEnrollees")) || [];
                enrolledList.push(newEnrollee);
                localStorage.setItem("witiEnrollees", JSON.stringify(enrolledList));

                luxuryForm.reset();
                luxuryForm.classList.add("hidden");
                const stepper = document.querySelector(".stepper-bar");
                if (stepper) stepper.classList.add("hidden");
                
                if (successCard) {
                    successCard.classList.remove("hidden");
                }

                displayEnrolleesList();
            }
        });
    }
});
const luxuryForm = document.getElementById('luxuryForm');
const statusCard = document.getElementById('status-card');
const refNumber = document.getElementById('refNumber');

if (luxuryForm) {
    luxuryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Mag-generate ng random 4-digit tracking code
        const randomID = Math.floor(1000 + Math.random() * 9000);
        if (refNumber) {
            refNumber.textContent = `#WITI-2026-${randomID}`;
        }

        // Itago ang form at ang stepper bar sa itaas
        luxuryForm.style.display = 'none';
        const stepperBar = document.querySelector('.stepper-bar');
        if (stepperBar) {
            stepperBar.style.display = 'none';
        }

        // Ipakita ang ating status card na may Tracking ID at Home button
        if (statusCard) {
            statusCard.classList.remove('hidden');
        }
    });
}

function toggleWitiChat() {
    const chatWindow = document.getElementById("witiChatWindow");
    const chatPrompt = document.getElementById("chatPrompt");
    
    chatWindow.classList.toggle("active");
    
    if (chatWindow.classList.contains("active")) {
        chatPrompt.style.display = "none";
    }
}

function askWiti(topic) {
    const chatBody = document.getElementById("chatBody");
    const quickReplies = document.getElementById("quickReplies");
    
    let userText = "";
    let botReply = "";

    if (topic === 'enrollment') {
        userText = "How to enroll?";
        botReply = "Enrolling in WITI San Jose is simple! You can click on the 'Enrollment Form' in the menu to fill out the online registration form, or you can visit us directly at Lopez Jaena Street, Brgy. Pag-asa.";
    } else if (topic === 'courses') {
        userText = "What programs/tracks are available?";
        botReply = "We offer Senior High School ICT, ABM, ASSH, STEM, and HT.";
    } else if (topic === 'location') {
        userText = "Where is the campus location?";
        botReply = "The WITI San Jose Branch is located at the WITI Building, Lopez Jaena Street, Brgy. Pag-asa, San Jose, Occidental Mindoro.";
    } else if (topic === 'requirements') {
        userText = "What are the requirements?";
        botReply = "The main requirements are Form 137 (Report Card), Certificate of Good Moral Character, 2x2 ID picture, Certificate of Completion, and PSA Birth Certificate.";
    } else if (topic === 'tuition') {
        userText = "How much is the tuition fee?";
        botReply = "No tuition fees for qualified students.";
    } else if (topic === 'uniform') {
        userText = "How much is the uniform?";
        botReply = "1 set of Academic uniform (blouse, skirt, and necktie) and PE uniform (shirt and pants) are free for qualified students, also the ID lace and ID are free. But if you want an another set of uniform, the Academic uniform is 1200 pesos, PE uniform is 700 pesos, and ID with lace is 160 pesos, necktie cost 75.";
    } else if (topic === 'cash') {
        userText = "How much is the cash assistance?";
        botReply = "The cash assistance is 2000 Pesos.";
    }

    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerHTML = `<p>${userText}</p>`;
    chatBody.appendChild(userMsg);

    if (quickReplies) quickReplies.remove();

    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";
        botMsg.innerHTML = `<p>${botReply}</p>`;
        chatBody.appendChild(botMsg);

        const newReplies = document.createElement("div");
        newReplies.className = "chat-quick-replies";
        newReplies.innerHTML = `
            <button onclick="askWiti('enrollment')"> How to enroll?</button>
            <button onclick="askWiti('courses')"> What programs/tracks are available?</button>
            <button onclick="askWiti('location')"> Where is the campus location?</button>
            <button onclick="askWiti('requirements')"> What are the requirements?</button>
            <button onclick="askWiti('tuition')"> How much is the tuition fee?</button>
            <button onclick="askWiti('uniform')"> How much is the uniform?</button>
            <button onclick="askWiti('cash')">How much is the cash assistance?</button>
        `;
        chatBody.appendChild(newReplies);

        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}

document.addEventListener("DOMContentLoaded", function () {
    displayEnrolleesList();
});

function displayEnrolleesList() {
    // Para sa Grade 11 Container
    const g11Container = document.getElementById("g11EnrolleesContainer") || document.getElementById("enrolleesContainer");
    // Para sa Grade 12 Container
    const g12Container = document.getElementById("g12EnrolleesContainer");

    let enrolledList = JSON.parse(localStorage.getItem("witiEnrollees")) || [];
    let validList = enrolledList.filter(student => student.name && student.name.trim() !== "");

    if (validList.length === 0) {
        const emptyHTML = "<p style='color: #666; text-align: center; padding: 15px;'>No students enrolled yet.</p>";
        if (g11Container) g11Container.innerHTML = emptyHTML;
        if (g12Container) g12Container.innerHTML = emptyHTML;
        return;
    }

    // I-filter ang Grade 11 at Grade 12
    const g11List = validList.filter(s => s.yearLevel === "Grade 11");
    const g12List = validList.filter(s => s.yearLevel === "Grade 12");

    // Function para gumawa ng Table HTML
    function generateTableHTML(list) {
        if (list.length === 0) {
            return "<p style='color: #666; text-align: center; padding: 15px;'>No applicants for this grade level yet.</p>";
        }
        let html = `
            <div style="overflow-x: auto;">
                <table style="width:100%; border-collapse: collapse; color: #333; text-align: left; font-size: 0.95rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid #ddd; background: #f8f9fa;">
                            <th style="padding: 12px 10px;">Full Name</th>
                            <th style="padding: 12px 10px;">Course / Track</th>
                            <th style="padding: 12px 10px;">Grade Level</th>
                            <th style="padding: 12px 10px;">Date Enrolled</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        list.forEach(student => {
            html += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; color: #222;">${student.name}</td>
                    <td style="padding: 10px; color: #444;">${student.course}</td>
                    <td style="padding: 10px; color: #444;">${student.yearLevel}</td>
                    <td style="padding: 10px; color: #666;">${student.date}</td>
                </tr>
            `;
        });
        html += `</tbody></table></div>`;
        return html;
    }

    /*dito nagd-display ng table for enrollees and nahahati na rin siya sa g11 and g12*/
    if (g11Container) {
        g11Container.innerHTML = generateTableHTML(g11List);
    }
    if (g12Container) {
        g12Container.innerHTML = generateTableHTML(g12List);
    } else if (g11Container && !g12Container) {
        
        g11Container.innerHTML = `
            <h3 style="color: #38bdf8; margin-bottom: 10px;">Grade 11 Applicants</h3>
            ${generateTableHTML(g11List)}
            <h3 style="color: #38bdf8; margin: 20px 0 10px 0;">Grade 12 Applicants</h3>
            ${generateTableHTML(g12List)}
        `;
    }

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("facultySearchInput");
    
    if (searchInput) {
        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                
                const filter = searchInput.value.toLowerCase().trim();
                if (!filter) return;

                const personCards = document.querySelectorAll(".person-card");
                let matchedCard = null;

                personCards.forEach(card => {
                    const name = card.querySelector(".person-info h3") ? card.querySelector(".person-info h3").textContent.toLowerCase() : "";
                    const position = card.querySelector(".person-info .position") ? card.querySelector(".person-info .position").textContent.toLowerCase() : "";
                    const cardText = card.textContent.toLowerCase();

                    if ((name.includes(filter) || position.includes(filter) || cardText.includes(filter)) && !matchedCard) {
                        matchedCard = card;
                    }
                });

                if (matchedCard) {
                    
                    matchedCard.click();
                    searchInput.value = ""; 
                } else {
                    
                    const adminHeader = document.querySelector(".category-title");
                    if ((filter.includes("admin") || filter.includes("staff")) && adminHeader) {
                        adminHeader.scrollIntoView({ behavior: "smooth", block: "start" });
                        searchInput.value = "";
                    } else {
                        alert("No faculty or administrator found matching '" + filter + "'");
                    }
                }
            }
        });
    }
});

window.openCampusModal = function () {
    const modal = document.getElementById("campusModal");
    if (modal) {
        modal.style.display = "flex";
    }
};

window.closeCampusModal = function () {
    const modal = document.getElementById("campusModal");
    if (modal) {
        modal.style.display = "none";
    }
};

window.closeCampusModalOnOuterClick = function (e) {
    if (e.target.id === "campusModal") {
        closeCampusModal();
    }
};

function toggleSchoolHymn() {
    const audio = document.getElementById("schoolHymnAudio");
    const hymnCard = document.querySelector(".hymn-card");
    const playIcon = document.getElementById("hymnPlayIcon");
    const btnText = document.getElementById("hymnBtnText");
    const hymnStatus = document.getElementById("hymnStatus");

    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            if (hymnCard) hymnCard.classList.add("playing");
            if (playIcon) playIcon.textContent = "❚❚";
            if (btnText) btnText.textContent = "Pause Hymn";
            if (hymnStatus) hymnStatus.textContent = "Now Playing 🎶 • San Jose Branch Anthem";
        }).catch(error => {
            console.log("Audio file error:", error);
            alert("⚠️ Audio file not found. Please add 'hymn.mp3' to your project folder.");
        });
    } else {
        audio.pause();
        if (hymnCard) hymnCard.classList.remove("playing");
        if (playIcon) playIcon.textContent = "▶";
        if (btnText) btnText.textContent = "Play School Hymn";
        if (hymnStatus) hymnStatus.textContent = "Official School Anthem • San Jose Branch";
    }
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    localStorage.setItem('witi_theme', isDark ? 'dark' : 'light');
    
    updateToggleUI(isDark);
}

function updateToggleUI(isDark) {
    const checkbox = document.getElementById('themeToggleCheckbox');
    if (checkbox) checkbox.checked = isDark;
    
    const icon = document.getElementById('pillIcon');
    const text = document.getElementById('pillText');
    if (icon && text) {
        icon.textContent = isDark ? '☀️' : '🌙';
        text.textContent = isDark ? 'DAY MODE' : 'NIGHT MODE';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('witi_theme');
    const isDark = savedTheme === 'dark';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    updateToggleUI(isDark);
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.facility-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            const img = card.getAttribute('data-img');
            
            document.getElementById('modalFacilityTitle').textContent = title;
            document.getElementById('modalFacilityDesc').textContent = desc;
            document.getElementById('modalFacilityImg').src = img;
            
            /*for opening modal*/
            document.getElementById('facilityModal').classList.add('active');
        });
    });
});

/*para sa closing modal*/
function closeFacilityModal() {
    document.getElementById('facilityModal').classList.remove('active');
}

function closeFacilityModalOutside(event) {
    const modal = document.getElementById('facilityModal');
    if (event.target === modal) {
        closeFacilityModal();
    }
}
/*for neon cursor effect pag ginalaw ang mouse or cursor sa screen*/
document.addEventListener('mousemove', (e) => {
    /*for small neon dot*/
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    
    document.body.appendChild(dot);
    
    setTimeout(() => {
        dot.style.transform = 'translate(-50%, -50%) scale(0)';
        dot.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        dot.remove();
    }, 450);
});
function switchTab(evt, tabId) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}
