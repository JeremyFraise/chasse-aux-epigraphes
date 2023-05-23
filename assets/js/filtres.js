/**
 * @fileoverview Filtrer selon un critère
 */

/* Variables globales */
const cartes = document.querySelectorAll('.card');
const arrBtnFiltres = document.querySelectorAll('.filtres__bouton');

/* Écouteurs d'événement */
arrBtnFiltres.forEach(function (btnFiltre) {
    btnFiltre.addEventListener('click', filtrer);
});

/* Fonctions */
function filtrer() {
    
    let filtre;
    if(this.dataset.critere != undefined){
       filtre = this.dataset.critere;
    }
    if(this.dataset.secteur != undefined){
        filtre = this.dataset.secteur;
    }
    console.log(filtre);
    cartes.forEach(function (carte) {
        carte.classList.remove('selection');
        // console.log(carte.dataset.critere);
        if (carte.dataset.critere == filtre) {
            carte.classList.add('selection');
        }
        if(carte.dataset.secteur == filtre){
            carte.classList.add('selection');
        }
    });
}
