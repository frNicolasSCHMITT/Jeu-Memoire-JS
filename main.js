const divResultat = document.querySelector("#resultat"); //correspond à la <div id=resultat> de l'HTML

var tabJeu = [  //Tableau multidimentionnel de base
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

// var tabResultat = [         tableau rempli de valeurs = images
//     [1,2,3,4],
//     [4,3,2,1],
//     [5,6,7,8],
//     [8,7,6,5]
// ];
var tabResultat = genereTableauAleatoire(); //attribue les valeurs de tabResultat par la fonction genereTableauAleatoire()

var oldSelection=[];  //conserve la position du bouton précédemment clické (donc sa valeur attribuée par tabResultat)
var nbAffiche= 0;  //check le nombre de click
var ready = true;  //Timer

// fonction génératrice du tableau et boutons pour la page Web , i = lignes , j = colonnes;

afficherTableau();

function afficherTableau(){
    var txt = "";  //déclare la variable txt qui sera ajoutée à l'HTML

    for(var i=0; i < tabJeu.length ; i++){ //Boucle qui génère des lignes pour le tableau jusqu'a la longueur prédéfinie du tableau
        txt += "<div>";  //Génère une <div> dans le HTML à chaque txt du JS
        for(var j=0; j < tabJeu[i].length; j++){ //Boucle qui génère des colonnes pour le tableau jusqu'a la longueur prédéfinie du tableau
            if(tabJeu[i][j] === 0){ //Génère les boutons dans le tableau si valeur de l'emplacement = 0
                txt +="<button class='btn btn-primary m-2' onClick='verif(\""+i+"-"+j+"\")'>Afficher</button>"; //onClick =  lance la fonction verif si click avec emplacement du bouton séléctionné (i=ligne , j=colonne) sous forme de "string" à l'aide des \.
            }
            else{  //Génère les éléments images dans le tableau selon les règles définies dans la fonction getImage
                txt += "<img src='"+getImage(tabJeu[i][j])+"' class='m-2'>";
            }
            
        }
        txt += "</div>"; //Ferme la <div> générée 
    }
    divResultat.innerHTML = txt; // Ajoute à la <div id=resultat> le contenu de TXT
}

// fonction génératrice d'image pour utilisation dans la fonction précédente
function getImage(valeur){   
    var imgTxt = "image/"; //variable avec tronc commun des images (ici, le dossier d'origine)
    switch(valeur){
        case 1 : imgTxt += "elephant.png" //Choix de cette image si valeur emplacement tableau = 1
        break;
        case 2 : imgTxt += "giraffe.png" //Choix de cette image si valeur emplacement tableau = 2
        break;
        case 3 : imgTxt += "hippo.png" //Choix de cette image si valeur emplacement tableau = 3
        break;
        case 4 : imgTxt += "monkey.png" //Choix de cette image si valeur emplacement tableau = 4
        break;
        case 5 : imgTxt += "panda.png" //Choix de cette image si valeur emplacement tableau = 5
        break;
        case 6 : imgTxt += "parrot.png" //Choix de cette image si valeur emplacement tableau = 6
        break;
        case 7 : imgTxt += "penguin.png" //Choix de cette image si valeur emplacement tableau = 7
        break;
        case 8 : imgTxt += "pig.png" //Choix de cette image si valeur emplacement tableau = 8
        break;
        default : console.log("cas non pris en compte") //rapport dans la console en cas d'erreur
    }
    return imgTxt; //fonction retourne l'élément imgTxt pour la fonction afficherTableau()
}

// fonction vérification du click

function verif(bouton){
    if(ready){  //si timer ok :
            
        nbAffiche++; //incrémente à chaque click

        var ligne = bouton.substr(0,1);  //transforme le "string" en position ligne
        var colonne = bouton.substr(2,1);  //transforme le "string" en position colonne
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne];  // attribue les valeurs de tabResultat à tabJeu lors du click
        afficherTableau();

        if(nbAffiche>1){ //actif si au moins 2 click enregistrés
            ready = false; //début du timer
            setTimeout(() => {  //Conditions du Timer
                if(tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){ //check si les 2 clicks n'ont pas la même valeur (donc img)
                    tabJeu[ligne][colonne] = 0; // réinitialise le dernier bouton clické (re-cache l'img)
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0 ; // réinitialise le précédent bouton clické (re-cache l'img)
                }
                afficherTableau(); // réaffiche le tableau
                ready = true;  // indique que le Timer est écoulé 
                nbAffiche = 0;
                oldSelection = [ligne,colonne];  //conserve la position du bouton précédemment clické (donc sa valeur attribuée plus tôt)
            },500)     // ,500= valeur du Timer (en ms)       

        }
        else{  //enregistre la position et la valeur du bouton 
            oldSelection = [ligne,colonne];
        }

    }

}
//function génératrice de tableau aléatoire
function genereTableauAleatoire(){
    var tab = [];  //génère un tableau à une dimension

    var nbImagePosition=[0,0,0,0,0,0,0,0];  //Tableau conservant les valeurs attribuées aux images

    for(var i = 0 ; i < 4; i++){ //Boucle générant des lignes jusqu'en avoir 4
        var ligne = [];
        for(var j = 0 ; j < 4 ; j++){ //Boucle générant des colonnes jusqu'en avoir 4
            var fin = false;
            while(!fin){  //Boucle pour générer les img aléa, 2 de chaque sorte
                var randomImage = Math.floor(Math.random() * 8);  //génère aléatoirement des chiffres entiers(floor) de 0 à 7, avec un +1 ensuite devenant 1 à 8
                if(nbImagePosition[randomImage] < 2){  //Pour éviter d'avoir plus de 2 fois la même image
                ligne.push(randomImage+1); //Ajoute des lignes aux valeurs des images, passant de 1 à 8
                nbImagePosition[randomImage]++; //Incrémente tant qu'on en a pas 2 de chaque
                fin = true; //Sors de la boucle quand on en a 2 de chaques
                
                }
            }
        }
        tab.push(ligne);
    }

    return tab; //renvoie le tableau à une dimension pour tabResultat (tout en haut)
}