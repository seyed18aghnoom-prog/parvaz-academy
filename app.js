/* اتصال به Firebase */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* ثبت‌نام */
function register() {
  const name = document.getElementById("name").value;
  const national = document.getElementById("national").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(phone + "@parvaz.com", password)
    .then(user => {
      db.collection("students").doc(user.user.uid).set({
        name: name,
        national: national,
        phone: phone
      });
      alert("ثبت‌نام با موفقیت انجام شد");
    })
    .catch(err => alert(err.message));
}

/* ورود */
function login() {
  const phone = document.getElementById("loginPhone").value;
  const password = document.getElementById("loginPass").value;

  auth.signInWithEmailAndPassword(phone + "@parvaz.com", password)
    .then(user => {
      db.collection("students").doc(user.user.uid).get().then(doc => {
        document.getElementById("profile").innerHTML =
          "نام: " + doc.data().name + "<br>" +
          "کد ملی: " + doc.data().national + "<br>" +
          "شماره همراه: " + doc.data().phone;
      });
    })
    .catch(err => alert(err.message));
}
