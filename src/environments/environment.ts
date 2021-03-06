// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    baseUrl: 'https://jegybazar-31517.firebaseio.com',
    registrationUrl: ' https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser',
    loginUrl: ' https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
    apiKey: 'AIzaSyDbBQZQI_o2YRNGoKCzs3G7RrGl0Amsg74',
    authDomain: 'jegybazar-31517.firebaseapp.com',
    databaseURL: 'https://jegybazar-31517.firebaseio.com',
    projectId: 'jegybazar-31517',
    storageBucket: 'jegybazar-31517.appspot.com',
    messagingSenderId: '944032524552'
  }
};
