# Digital Screen Painte

*Manipuler la machine pour generer des interfaces créatives*

![](https://i.imgur.com/yV6AfnJ.png)

> &copy; [Julien Noyer](https://www.linkedin.com/in/julien-n-21219b28/) - All rights reserved for educational purposes only

<br>

## Pour générer un design Web, tout est une question de balise

Avec l'évolution des navigateurs Web et l'arriver de nouveaux standards pour la création d'éléments visuelles, il est primordiale de définir ceux qui sont les plus pertinents pour réaliser un design. Si l'utilisation du format [Scalable Vector Graphics (.svg)](https://fr.wikipedia.org/wiki/Scalable_Vector_Graphics) à apporter l'avantage indéniable de pouvoir utiliser un [format d'image vectorielle (eq. Illustrator)](https://www.futura-sciences.com/tech/definitions/informatique-image-vectorielle-13099/) sur une page Web tout en pouvant manipuler chacun des vecteurs en CSS et en Javascript, il n'en reste pas moins un format qui peut surcharger le [Document Object Model (DOM)](https://fr.wikipedia.org/wiki/Document_Object_Model) dans le cadre de visuels complèxes.

L'élément [canvas](https://fr.wikipedia.org/wiki/Canvas_(HTML)) est un composant du langage Web HTML qui permet d'effectuer des rendus dynamiques d'images bitmap en utilisant des javascripts. L'un des avantages à utiliser les canvas est que le visuel est rendu dans un seul et unique élément HTML, ce qui limite énormément l'impact que pourrait avoir l'exécution du code dans le chargement de la page Web. Mais cet avantage n'arrive pas seul, il est aussi important de noter que la manipulation des graphiques dans un canvas est plus compliquée que dans un visuel SVG car tout le visuel doit être réalisé en Javascript.

<br>

## Présentation du projet "Digital Screen Painter"

Le projet développé dans ce répertoire permet de déssiner des forme aléatoire sur un écran d'ordinateur, en captant les mouvements mouvement de la main devant une Webcam. Basé sur plurieurs examples en ligne, ce projet à pour but de définir les bases pour la pratique du Design Génératif en Javascript, en se concentrant sur deux aspects primordiaux : l'intelligence artificielle et et les choix aléatoires.

<br>

### Dessiner sur un canvas HTML

![](https://i.imgur.com/igbQwW1.png)

Il serait bien prétencieux de ma part de me lancer dans un tutoriel sur l'utilisation des canvas qui dépasserait le niveau de celui de MDN. Cette plateforme m'accompagne depuis de nombreuses années et je continu à l'utiliser à titre personnel ou dans le cadre des formations que je donne. C'est donc tout naturellement que je me base sur leurs tutoriels lorsque j'élabore des nouveaux programme, comme une ressource à laquelle se référencer.

> En savoir plus https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial

<br>

### P5.js : la librairie Javascript pour "Creative Coders"

![](https://i.imgur.com/KGKkrGK.png)

[P5.js](https://p5js.org) est une librairie qui à pour ambition de rendre accessible et plus lisible la génération de visuels sur une canvas HTML. Nullement réservée à des profils expert, l'objectif de P5.js est de permettre à des designers de débuter dans la création graphique assitée par ordinateur. Très inspirée par le [langage Processing](https://fr.wikipedia.org/wiki/Processing), P5.js est un outil idéal car il permet en plus de la création graphique, d'apprendre des principes qui sont ensuite transposables dans d'autres pratiques.

> En savoir plus https://p5js.org

<br>

### ML5.js : utiliser des modèles prédictifs

![](https://i.imgur.com/mVofsbk.png)

[ML5.js](https://ml5js.org) est une librairie qui se base sur les modèles de [Tensorflow.js](https://www.tensorflow.org/js?hl=fr) pour permettre de faire des prédiction basées sur les résutats des-dits modèles. Il est également possible de créer des réseaux de neurones avec [ML5.js](https://ml5js.org), mais ça s'avérer être d'une très grande utilités lorsqu'il s'agit de capter des mouvement ou d'analyser des images et des sons.

> En savoir plus https://ml5js.org

---

<br><br>

## Ressources

![](https://i.imgur.com/eAySYs0.png)

> Index des liens vers les sujets traités dans ce répertoire : 

- [**P5.js** JavaScript library for creative coding](https://p5js.org)
- [**ML5.js** Creating and exploring artificial intelligence in the browser.](https://ml5js.org)
- [**MDN** Introduction to canvas](https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial)
- [**Wikipedia** Scalable Vector Graphics (.svg)](https://fr.wikipedia.org/wiki/Scalable_Vector_Graphics)
- [**Futura Science** Image vectorielle](https://www.futura-sciences.com/tech/definitions/informatique-image-vectorielle-13099/)
- [**Wikipedia** Document Object Model (DOM)](https://fr.wikipedia.org/wiki/Document_Object_Model)
- [**Wikipedia** HTML Canvas](https://fr.wikipedia.org/wiki/Canvas_(HTML))
- [**Wikipedia** Langage Processing](https://fr.wikipedia.org/wiki/Processing)
