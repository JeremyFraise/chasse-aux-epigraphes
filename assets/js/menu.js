/**
 * @file Un menu simple, responsive bâti en amélioration progressive.
 * @version v3.1 Mise à jour le 7 février :: changement du préfixe tag pour ref ! 
 * @author TIMCSF et Adapté par Jeremy Fraser
 * @todo Problème: si le menu est fermé, les liens de menu ne devrait pas être dans l'ordre de tabulation?
 */

//*******************
// Déclaration d'objet(s)
//*******************

let menu = {
    javascriptEnabled: document.body.classList.add('js'),
    strImageNavClosed: 'assets/image/menu hamburger@2x.png',
    strImageNavOpen: 'assets/image/close_FILL0_wght400_GRAD0_opsz48.png',
    refButton: null,
    refImg: null,
    refNav: document.querySelector('.nav'),
  
    configurerNav: function () {
      
      document.querySelector('.entete').classList.remove('.enteteMobile__sansJS');
      // Crédit pour le bout de code à la ligne 23  ->  https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
      let arrNomFichier = location.pathname.split("/").slice(-1); // Retourne un object
      let strNomFichier = arrNomFichier[0]; // Retourne la string désirée

      // Vérifie le nom du document diffère de celle de la page d'accueil pour ensuite modifier les liens des images de ces dernières 
      if(strNomFichier != 'index.html') {
        this.strImageNavClosed = '../assets/image/menu hamburger@2x.png';
        this.strImageNavOpen = '../assets/image/close_FILL0_wght400_GRAD0_opsz48.png';
      }

      //********** Création du bouton du menu mobile

      // On crée VIRTUELLEMENT un bouton et un span (pour le texte du bouton)
      this.refButton = document.createElement('button');
      this.refButton.classList.add("btnMenu")
      this.refImg = document.createElement('img');
      this.refImg.classList.add("btnMenu__image");
  
      // On ajoute le span dans le bouton
      this.refButton.appendChild(this.refImg);
  
      // On ajoute des classes au Button et au span
      this.refButton.classList.add('nav__control');
  
      // On place le texte du Button dans son conteneur span
      this.refImg.src = this.strImageNavClosed;
  
      // On ajoute le Button dans le html:
      // plus précisément comme premier enfant dans le nav  
      this.refNav.prepend(this.refButton);
  
      // Ajout de l'écouteur d'événement sur le bouton du menu
      this.refButton.addEventListener('click', function () {
        menu.ouvrirFermerNav();
      });
  
      // ajouter la classe d'état fermé au menu
      this.refNav.classList.add('nav--closed');
    },
  
    ouvrirFermerNav: function () {
      // On bascule (ajoute ou enlève) la classe de fermeture du menu
      this.refNav.classList.toggle('nav--closed');
  
      // On change le texte du bouton selon l'état du menu
      if (this.refNav.classList.contains('nav--closed')) {
        this.refImg.src = this.strImageNavClosed;
        document.querySelector('.entete').classList.remove('enteteQuandMenuOuvert');
      } else {
        this.refImg.src = this.strImageNavOpen;
        document.querySelector('.entete').classList.add('enteteQuandMenuOuvert');
      }
    }
  };
  
  
  //*******************
  // Écouteurs d'événements
  //*******************
  window.addEventListener('load', function () {
    menu.configurerNav();
  });