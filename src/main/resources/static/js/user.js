$(document).ready(function () {
    loadUserTable();
});

function loadUserTable(email) {
    $.get("/user/user",
        {email:email},
        function (user){
            var table = document.getElementById("userTable");
            var tr = document.createElement('tr');
            var tdId = document.createElement('td');
            tdId.innerHTML = user.id;
            var tdFirstName = document.createElement('td');
            tdFirstName.innerHTML = user.firstName;
            var tdLastName = document.createElement('td');
            tdLastName.innerHTML = user.lastName;
            var tdAge = document.createElement('td');
            tdAge.innerHTML = user.age;
            var tdEmail = document.createElement('td');
            tdEmail.innerHTML = user.email;
            var tdRoles = document.createElement('td');
            tdRoles.innerHTML = getRoleByUser(user);
            tr.appendChild(tdId);
            tr.appendChild(tdFirstName);
            tr.appendChild(tdLastName);
            tr.appendChild(tdAge);
            tr.appendChild(tdEmail);
            table.children[0].appendChild(tr);
            tr.appendChild(tdRoles);

    });
}


function getRoleByUser(user) {
    return user.rolesByUser;
}
