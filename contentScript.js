// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// ? Weiterleitungen
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------

// Überprüfe, ob Schüler angemeldet ist. Wenn nicht, leite zur Anmeldeseite weiter.
if (document.body.innerText.indexOf("Sie sind nicht angemeldet!") != -1) {
    window.location.href = "https://schueler.domgymnasium-nmb.de/login.php";
}

// Überprüfe, ob Schüler auf veralteter Seite ist. Wenn ja, leite zur neuen Seite weiter.
if (window.location.href == "https://intern.domgymnasium-nmb.de/") {
    window.location.href = "https://schueler.domgymnasium-nmb.de/intern.php";
}

// Überprüfe, ob Schüler auf der Anmeldeseite ist. Wenn ja, öffne Popup.
if (window.location.href == "https://schueler.domgymnasium-nmb.de/login.php") {
    document.getElementById('id01').style.display = 'block';
}

// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// ? Anmeldedaten speichern / Anmeldeseite
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------

if (window.location.href == "https://schueler.domgymnasium-nmb.de/login.php") {
    submitButton = document.getElementsByName("send")[0];
    form = document.getElementsByTagName("form")[0];
    container = document.getElementsByClassName("w3-center")[1];

    container.className = "w3-center w3-container";
    container.style.margin = "20px";

    // Überprüfe, ob bereits Anmeldedaten gespeichert sind
    chrome.storage.sync.get(["username", "password"], function (items) {
        if (items.username && items.password) {

            // Verstecke Formular
            form.style.display = "none";

            loginAsButton = document.createElement("button");
            loginAsButton.className = "w3-button w3-block w3-green w3-section w3-padding";
            loginAsButton.innerHTML = "Weiter als <b>" + items.username + "</b> ➡️";
            container.appendChild(loginAsButton);

            // Füge "Anderer Schüler" Link hinzu
            otherUserLink = document.createElement("a");
            otherUserLink.href = "javascript:void(0)";
            otherUserLink.innerHTML = "Als anderer Schüler anmelden";
            otherUserLink.style.marginTop = "20px";
            container.appendChild(otherUserLink);

            otherUserLink.onclick = function () {
                // Lösche gespeicherte Anmeldedaten und zeige Formular
                chrome.storage.sync.remove(["username", "password"]);

                form.style.display = "block";
                container.removeChild(loginAsButton);
                container.removeChild(otherUserLink);
            }

            loginAsButton.onclick = function () {
                document.getElementsByName("username")[0].value = items.username;
                document.getElementsByName("psw")[0].value = items.password;
                submitButton.click();
            }
        } else {
            // Wenn keine Anmeldedaten gespeichert sind, zeige Info-Text unter Form
            infoText = document.createElement("p");
            infoText.innerHTML = "⚠️ Deine Anmeldedaten werden <b>lokal</b> gespeichert. Wenn das nicht dein PC ist, melde dich bitte im Inkognito-Modus an.";
            infoText.style.marginTop = "20px";
            infoText.style.color = "gray";
            infoText.style.fontSize = "10px";
            container.appendChild(infoText);
        }
    });

    // Ändere Button von Submit zu Button
    submitButton.type = "button";

    // Wenn Button geklickt wird, Anmeldedataen speichern
    submitButton.onclick = function () {
        username = document.getElementsByName("username")[0].value;
        password = document.getElementsByName("psw")[0].value;
        // save in chrome extension storage
        chrome.storage.sync.set({
            "username": username,
            "password": password
        });

        // ändere Button zurück zu Submit
        submitButton.type = "submit";
        submitButton.click();
    }
}

// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// ? Navigationsmodifikationen
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------

// Wenn Schüler auf intern.php bzw. intern.php?seite=* ist, modifiziere Navigationsleiste
if (window.location.href.indexOf("https://schueler.domgymnasium-nmb.de/schueler/intern.php") != -1) {
    // Logout Link
    logoutLink = document.querySelector('a[href="../login.php?logout"]');
    logoutLink.innerHTML = "🚪Logout";
    logoutLink.style.backgroundColor = "#fadbd8";
    logoutLink.style.color = "red";

    // Termine
    termineLink = document.querySelector('a[href="?do=termine"]');
    termineLink.innerHTML = "📅 Termine";

    // Wahlbereich
    wahlbereichButton = document.getElementsByTagName("button")[0];
    wahlbereichButton.innerHTML = "⛷️ Wahlbereich";

    // Vertretungsplan
    vertretungsplanLink = document.querySelector('a[href="?do=vplan"]');
    vertretungsplanLink.innerHTML = "📚 Vertretungsplan";

    // Kontakte
    kontakteButton = document.getElementsByTagName("button")[1];
    kontakteButton.style.display = "none";

    // Oberstufenverordnung
    oberstufenverordnungLink = document.querySelector('a[href="ostvo.pdf"]');
    oberstufenverordnungLink.style.display = "none";

    // Office 365
    office365Link = document.querySelector('a[href="http://login.microsoftonline.com"]');
    office365Link.innerHTML = "📧 Office 365";

    // Füge "Noten" Link hinzu
    notenLink = document.createElement("a");
    notenLink.href = "https://schueler.domgymnasium-nmb.de/schueler/intern.php?do=noten";
    notenLink.innerHTML = "📝 Noten";
    notenLink.className = "w3-bar-item w3-button";

    document.getElementsByClassName("w3-bar")[0].appendChild(notenLink);
}

// Füge Text in Fußzeile hinzu
footer = document.getElementsByTagName("footer")[0];
year = new Date().getFullYear();
footer.innerHTML = "Domgymnasium Naumburg © " + year + " | <a href='https://kurtiii.de'>verfeinert von Kurt 🦆</a> ";