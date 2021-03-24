function addUser() {
    userName = document.getElementById("userName").value;
    localStorage.setItem("userName", userName);
    window.location = "hobby_room.html";
}