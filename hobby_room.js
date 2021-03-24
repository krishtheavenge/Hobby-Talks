var firebaseConfig = {
    apiKey: "AIzaSyCEUxRKGk-8napX1x3EgmaXarvyfkzgSV0",
    authDomain: "kwitter-15c98.firebaseapp.com",
    projectId: "kwitter-15c98",
    storageBucket: "kwitter-15c98.appspot.com",
    messagingSenderId: "953299796826",
    appId: "1:953299796826:web:3d504c386a2291bf40e963",
    databaseURL: "https://kwitter-15c98-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room name:" + Room_names);
            row = "<div class='roomName'" + Room_names + "onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>"
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}

function addRoom() {
    roomName = document.getElementById("roomName").value;
    firebase.database().ref("/").child(roomName).update({
        purpose: "adding room name"
    });
    localStorage.setItem("roomName", roomName);
    window.location = "hobby_page.html";

}

function redirectToRoomName(name) {
    console.log(name)
    localStorage.setItem("roomName", name);
    window.location = "hobby_page.html";
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";

}
getData();