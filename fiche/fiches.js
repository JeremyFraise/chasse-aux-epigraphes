// Déclaration de l'objet

function obtenirValeurUrlParam(strParam) {
    console.log()
    return new URLSearchParams(window.location.search).get(strParam);
}

const objFicheArtsVisuels = {
    // Méthode
    refPrenom: null,
    refNom: null,

    refUrlImage: null,
    refTitreImage: null,
    refCreditImage: null,

    refNotesBio: null,

    refCarte: null,

    refArrondissement: null,
    refQuartier: null,
    refAdresse: null,

    refPlaque: null,
    refTranscriptPlaque: null,

    refAudioUrl: null,
    refAudioPreambule: null,
    refAudioTransciption: null,
    refAudioCredit: null,

    /**
     * Affiche les informations du personnage sélectionné dans la page galerie
     */
    initialiser: function() {

        let intNoIndice = JSON.parse(localStorage.getItem('intCompteur'));

        let strIdFiche = obtenirValeurUrlParam('id');
        console.log(strIdFiche);

        // Fiche a été visité 
        const STR_VARIABLE_BLNFICHEVISITE = "bln_" + strIdFiche + "_estVisite";
        localStorage[STR_VARIABLE_BLNFICHEVISITE] = true;

        this.refPrenom = document.getElementById("prenom");
        this.refPrenom.innerText = objJSONepigraphes[strIdFiche].PRENOM;

        this.refNom = document.getElementById("nom");
        this.refNom.innerText = " " + objJSONepigraphes[strIdFiche].NOM;
        
        this.refUrlImage = document.getElementById('url_image');
        this.refUrlImage.src = "../assets/image/imagesOptimisees/fiche/personnages/405/" + strIdFiche + ".jpg";
        this.refUrlImage.alt = "Épigraphe de " + objJSONepigraphes[strIdFiche].PRENOM + " " + objJSONepigraphes[strIdFiche].NOM;

        this.refTitreImage = document.getElementById('titre_image');
        this.refTitreImage.innerText = objJSONepigraphes[strIdFiche].IMAGE.TITRE;

        this.refCreditImage = document.getElementById('credit_image');
        this.refCreditImage.innerText = objJSONepigraphes[strIdFiche].IMAGE.CREDIT;

        this.refNotesBio = document.getElementById('notes_biographiques').querySelector("p");
        this.refNotesBio.innerText = objJSONepigraphes[strIdFiche].BIOGRAPHIE;

        this.refCarte = document.getElementById('carteZoom');
        this.refCarte.src = "../assets/image/imagesOptimisees/fiche/zoomCarte/405/" + strIdFiche + ".jpg"; 

        this.refArrondissement = document.getElementById('arrondissement');
        this.refArrondissement.innerText = objJSONepigraphes[strIdFiche].ARRONDISSEMENT;

        this.refQuartier = document.getElementById('quartier');
        this.refQuartier.innerText = objJSONepigraphes[strIdFiche].QUARTIER;

        this.refAdresse = document.getElementById('adresse');
        this.refAdresse.innerText = objJSONepigraphes[strIdFiche].ADRESSE;

        this.refPlaque = document.getElementById('url_plaque');
        this.refPlaque.src = "../assets/image/imagesOptimisees/fiche/epigraphe/405/" + strIdFiche + ".jpg";
        this.refPlaque.alt = "Épigraphe de " + objJSONepigraphes[strIdFiche].PRENOM + " " + objJSONepigraphes[strIdFiche].NOM;

        this.refTranscriptPlaque = document.getElementById('transcript');
        this.refTranscriptPlaque.innerText = objJSONepigraphes[strIdFiche].PLAQUE_TRANSCRIPTION;

        this.refAudioUrl = document.getElementById('audio_url').querySelector('source');
        this.refAudioUrl.src = objJSONepigraphes[strIdFiche].AUDIO.URL;
        this.refAudioPreambule = document.getElementById('audio_preambule');
        this.refAudioPreambule.innerText = objJSONepigraphes[strIdFiche].AUDIO.DESCRIPTION;
        this.refAudioTransciption = document.getElementById('audio_transcription');
        this.refAudioTransciption.innerText = objJSONepigraphes[strIdFiche].AUDIO.TRANSCRIPTION;
        this.refAudioCredit = document.getElementById('audio_credit');
        this.refAudioCredit.innerText = objJSONepigraphes[strIdFiche].AUDIO.CREDIT;

        // Partie 2

        const strIdPersonnage = localStorage.getItem('id_personnage');
        console.log(strIdPersonnage);

        let refReponseChoisi = "";

        if(strIdPersonnage != null) { // La chasse est débutée
            document.getElementById('zoneChasseEnCours').hidden = false;
            const arrChoixTotal = document.getElementsByName('formChasse');

            for(index = 0; index < arrChoixTotal.length; index++) {
                if(arrChoixTotal[index].checked == true) {
                    console.log(arrChoixTotal[index]);
                    refReponseChoisi = arrChoixTotal[index];
                }
            }

            let strIdBonneReponse = localStorage.getItem('id_' + refReponseChoisi.id);

            // Vérifie si l'utilisateur a soumis
            document.getElementById("message").classList.add("retroaction");
            if(refReponseChoisi != "") {
                
                if(obtenirValeurUrlParam('id') == strIdBonneReponse) {

                        document.getElementById('message').innerHTML = "Bravo! Vous avez trouvé «" + objJSONepigraphes[strIdFiche].CHASSE.REPONSE + "».";
                        // Vérifie si l'utilisateur à déjà soumis cette réponse
                        if(JSON.parse(localStorage.getItem(refReponseChoisi.id + '_est_trouve')) != true) {
                            localStorage[refReponseChoisi.id + '_est_trouve'] = true;
                            intNoIndice++;

                            localStorage.intCompteur = intNoIndice;
                        }
                        else{
                            document.getElementById('message').innerHTML = "Vous avez déjà trouvé ce(t) " + refReponseChoisi.id + ".";
                        }
                        if(localStorage.intCompteur == 3) {
                            document.getElementById('message').innerHTML = "Bravo! Vous avez terminé la chasse, vous pouvez maintenant participer au Concours!";
                        }
                    
                    
                }
                else{
                    document.getElementById('message').innerHTML = "Désolé. Ce n’est pas le bon élément.";
                }   
            }
        }
        else{
            localStorage.intCompteur = 0;
            document.getElementById('zoneChasseEnCours').hidden = true;
        }
        document.getElementById('btnSoumettre').addEventListener('click', objFicheArtsVisuels.initialiser);

        // Remplace le nombre d'indice
        let refPhraseIndice = document.getElementById("progressionChasse");
        refPhraseIndice.innerText = "(" + intNoIndice + " indice trouvé sur 3)";

    },



    empecherEnvoiFormulaire: function(e) {
        e.preventDefault();
    },
    
};

window.addEventListener('DOMContentLoaded', objFicheArtsVisuels.initialiser);

document.querySelector('form').addEventListener("submit", objFicheArtsVisuels.empecherEnvoiFormulaire);