# AngularTesting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Progetto
L'idea nasce per spiegare test unitari (e end-to-end) sia ai nuovi assunti che non siano già esperti, sia per il corso su Angular di Umana.
Il progetto prevede una dashboard dove sono mostrati dei colori tramite un accordion con stile tipica di Pantone (se si sospettano problemi di copyright, nonostante lo scopo didattico, si può cambiare la stringa con qualcosa di simile ma non registrato). I colori vengono caricati da chiamate API a web o a mock locale. L'altra pagina del progetto prevede la modifica di uno dei colori o l'aggiunta di un nuovo colore.
Questo dovrebbe presentare la struttura barebones per poter sviluppare il minimo numero di componenti che sia però abbastanza complessa per poter sfruttare tutti i casi di test che si vogliono trattare, includendo componenti che di solito non si usano su progetti più semplici (es: resolver per pre-caricare la lista di colori, pipe per dire da quanto tempo è stato modificato un colore, direttive per la conversione su mouse-over tra codice colore esadecimale a RGBa, chiamate con Observable e Promises per testare le varie zone di asincronia di Angular, etc.).