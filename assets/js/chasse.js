/**
 * @file JavaScript de la page chasse.html qui assure que l'utilisateur est capable de suivre sa progression
 * @author Jeremy Fraser
 * @version 1
*/

// Déclaration de l'objet
const objChasse = {
    // Attributs
    arrIdsPersonnagesAPiger: ['e0001', 'e0008', 'e0015', 'e0019'],
    arrIdsObjetsAPiger: ['e0002', 'e0004', 'e0007', 'e0021'],
    arrIdsLieuxAPiger: ['e0005', 'e0012', 'e0016', 'e0022'],

    
    arrTypeChoix: ["personnage", "objet", "lieu"],
    // À compléter

    initialiser: function() {

        // Affiche le nombre d'indice sur 3
        if(localStorage.intCompteur != undefined) {
            
        }
        

        if(localStorage.id_personnage == null) {
            document.getElementById("indicePersonnage").innerText = "";
            document.querySelector(".chasseDebutee").classList.add("cache");
            document.getElementById("btnCommencee").disabled = false;
            document.getElementById("btnReintialiser").classList.add("cache");
        }
        else if(localStorage.intCompteur < 3){

            document.querySelector('.NbIndices').innerText = localStorage.intCompteur;

            document.getElementById("indicePersonnage").innerText = objJSONepigraphes[localStorage.getItem('id_personnage')].CHASSE.INDICE;
            document.getElementById("indiceObjet").innerText = objJSONepigraphes[localStorage.getItem('id_objet')].CHASSE.INDICE;
            document.getElementById("indiceLieu").innerText = objJSONepigraphes[localStorage.getItem('id_lieu')].CHASSE.INDICE;
            // Révèle les liens aux pages de galerie de personnage et de la carte
            document.querySelector(".chasseDebutee").classList.remove("cache");

            // Désactive le bouton débutant la chasse et révèle un autre bouton permettant de réactiver le premier
            document.getElementById("btnCommencee").disabled = true;
            document.getElementById("btnReintialiser").classList.remove("cache");
            
        }
        else {

            document.querySelector('.NbIndices').innerText = 3;

            document.querySelector(".chasseDebutee").classList.add("cache");
            document.querySelector(".retroaction").classList.remove("cache");
            document.getElementById("btnCommencee").disabled = true;
            document.getElementById("btnReintialiser").classList.remove("cache");
            document.getElementById('lienConcours').classList.remove('cache');
        }

        // Affiche le contenu
        for(let intType = 0; intType < this.arrTypeChoix.length; intType++) {
            if(JSON.parse(localStorage.getItem(this.arrTypeChoix[intType] + '_est_trouve')) == true) {
                document.getElementById('libelle_' + this.arrTypeChoix[intType]).innerText = objJSONepigraphes[localStorage.getItem('id_' + this.arrTypeChoix[intType])].PRENOM + " " + objJSONepigraphes[localStorage.getItem('id_' + this.arrTypeChoix[intType])].NOM;

            }
            else{
                document.getElementById('libelle_' + this.arrTypeChoix[intType]).innerText = this.arrTypeChoix[intType];
            }
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
window.addEventListener('DOMContentLoaded', function() {
    objChasse.initialiser();
});

document.getElementById('btnCommencee').addEventListener('click', function() {
    objChasse.demarrerChasse();
});

document.getElementById('btnReintialiser').addEventListener('click', function() {
    objChasse.reintialiserBoutonDebuter();
});