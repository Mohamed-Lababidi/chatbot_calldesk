# chatbot_calldesk

## Description

* Création d'un chatbot capable de nous donner le résumé d'un film.

## Exemple

Quel est le resumé de Harry Potter ?

Quel est le résumé de Fight Club ?

* Le lien du chatbot https://bot.dialogflow.com/Chatbot-Calldesk

## Fichiers

src/index.js: webhook ecrit avec flow
build/index.js: Compilation de webhook et uploader sur Google Cloud Platform, qui appel chatbot-Calldesk
test/index.test.js: Unit tests which uses client to call the chatbot

## Couverture du code par les TDD

* Utilisation de Istanbul et nyc, Voici le tableau de couverture:

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   96.43 |       50 |   88.89 |   96.15 |                   
 index.js |   96.43 |       50 |   88.89 |   96.15 | 36       
----------|---------|----------|---------|---------|-------------------


## Outils

* Firebase
* Dialogflow
* Api : https://api.themoviedb.org
* flow
* chai
* eslint
* Istanbul and nyc