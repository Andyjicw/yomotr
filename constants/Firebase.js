import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCfw4QmA4L8D2hpozscQde2HqvvVQ5DDi4',
  authDomain: 'yootr-d880b.firebaseapp.com',
  databaseURL: 'https://yootr-d880b.firebaseio.com',
  storageBucket: 'yootr-d880b.appspot.com',
  messagingSenderId: '976103005689'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
