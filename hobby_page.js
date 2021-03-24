//YOUR FIREBASE LINKS
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
userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

function getData() {
    firebase.database().ref("/" + roomName).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                nameTag = "<h4" + name + "<img class='userTick' src='tick.png'></h4>"
                messageTag = "<h4 class'message_h4'>" + message + "</h4>"
                likeTag = "<button class='btn btn-info' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                spanTag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button>";
                row = nameTag + messageTag + likeTag + spanTag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}

function updateLike(messageId) {
    console.log("clicked on a like button: " + messageId);
    buttonId = messageId;
    likes = document.getElementById(buttonId).value;
    updatedLikes = Number(likes) + 1;
    console.log(updatedLikes);
    firebase.database().ref(roomName).child(messageId).update({
        like: updatedLikes
    });
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name: userName,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";

}

getData();