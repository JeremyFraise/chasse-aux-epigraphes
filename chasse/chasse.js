
// Déclaration de l'objet
const objChasse = {
    // Attributs
    arrIdsPersonnagesAPiger: ['e0001', 'e0008', 'e0015', 'e0019'],
    arrIdsObjetsAPiger: ['e0002', 'e0004', 'e0007', 'e0021'],
    arrIdsLieuxAPiger: ['e0005', 'e0012', 'e0016', 'e0022'],
    // À compléter

    initialiser: function() {

        let strIdPersonnage = localStorage.getItem('id_personnage');
        console.log(strIdPersonnage);
        const strIndicePersonnage = objJSONepigraphes[strIdPersonnage];

        if(localStorage.id_personnage == null) {
            document.getElementById("indicePersonnage").innerText = "";
            document.querySelector(".chasseDebutee").classList.add("cache");
            document.getElementById("btnCommencee").disabled = false;
            document.getElementById("btnReintialiser").classList.add("cache");
        }
        else{
            document.getElementById("indicePersonnage").innerText = toString(objJSONepigraphes[strIdPersonnage]);
            document.querySelector(".chasseDebutee").classList.remove("cache");
            document.getElementById("btnCommencee").disabled = true;
            document.getElementById("btnReintialiser").classList.remove("cache");
        }
        

    },
    // Méthodes
    demarrerChasse: function() {
        let refSegPersonnage = document.getElementById('indicePersonnage');
        let refSegObjet = document.getElementById('indiceObjet');
        let refSegLieu = document.getElementById('indiceLieu');
        // À compléter
        let intHasardPersonnage = Math.floor(Math.random() * this.arrIdsPersonnagesAPiger.length);
        let intHasardObjet = Math.floor(Math.random() * this.arrIdsObjetsAPiger.length);
        let intHasardLieu = Math.floor(Math.random() * this.arrIdsLieuxAPiger.length);
        console.log(intHasardPersonnage + ", " + intHasardObjet + ", " + intHasardLieu);

        // Exemple de l'énoncé
        localStorage.id_personnage = this.arrIdsPersonnagesAPiger[intHasardPersonnage];
        localStorage.id_objet = this.arrIdsObjetsAPiger[intHasardObjet];
        localStorage.id_lieu = this.arrIdsLieuxAPiger[intHasardLieu];
        localStorage.personnage_est_trouve = false;
        localStorage.objet_est_trouve = false;
        localStorage.lieu_est_trouve = false;
        // Affiche les indices
        refSegPersonnage.innerText = objJSONepigraphes[this.arrIdsPersonnagesAPiger[intHasardPersonnage]].CHASSE.INDICE;
        refSegObjet.innerText = objJSONepigraphes[this.arrIdsObjetsAPiger[intHasardObjet]].CHASSE.INDICE;
        refSegLieu.innerText = objJSONepigraphes[this.arrIdsLieuxAPiger[intHasardLieu]].CHASSE.INDICE;

        // Reintialise le compteur
        localStorage.intCompteur = 0;

        // Affiche les hyperliens -> À vos claviers
        document.querySelector(".chasseDebutee").classList.remove("cache");
        // Désactive le bouton «Démarrer une chasse» qui sera réactiver après avoir appuyé sur le bouton «Voulez-vous pigez une nouvelle chasse?» -> À vos claviers
        document.getElementById("btnCommencee").disabled = true;
        document.getElementById("btnReintialiser").classList.remove("cache");
    },

    reintialiserBoutonDebuter: function() {

        document.querySelector(".chasseDebutee").classList.add("cache");
        document.getElementById("btnCommencee").disabled = false;
        document.getElementById("btnReintialiser").classList.add("cache");

    },

    // À compléter
}

// Déclaration des écouteurs d'événements
// À compléter
window.addEventListener('DOMContentLoaded', objChasse.initialiser);

document.getElementById('btnCommencee').addEventListener('click', function() {
    objChasse.demarrerChasse();
});

document.getElementById('btnReintialiser').addEventListener('click', function() {
    objChasse.reintialiserBoutonDebuter();
});