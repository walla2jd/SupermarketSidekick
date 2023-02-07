// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyATXHspBPl_tWp7XH3EUe6xHjA8naLeFEI",
  authDomain: "supermarket-sidekick-it2023.firebaseapp.com",
  projectId: "supermarket-sidekick-it2023",
  storageBucket: "supermarket-sidekick-it2023.appspot.com",
  messagingSenderId: "979546503381",
  appId: "1:979546503381:web:35e38da13ad91b91960a5c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  //See if user is signed in
  firebase.auth().currentUser(function(user) {
    var login = document.getElementById("content_container")
    if (user) {
      login.style.display === "none";
    } else {
      login.style.display === "initial";
    }
  });

  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    birth_city = document.getElementById('birth_city').value
    favorite_word = document.getElementById('favorite_word').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Please enter your email or password.')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(birth_city) == false || validate_field(favorite_word) == false) {
      alert('Please make sure both name and security questions are entered successfully.')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        birth_city : birth_city,
        favorite_word : favorite_word,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // Done
      alert('User has been created.')
      window.location.reload();
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is incorrect.')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User logged in.')
      window.location.reload();
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 8
    if (password < 8) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }