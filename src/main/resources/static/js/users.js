$(document).ready(function () {
    loadUsersTable();

});

function loadUsersTable() {
    const table = document.getElementById("usersTable");
    const div = document.createElement('tbody');
    div.id = 'tableDiv'

    $.get("/admin/users", function (users) {

        for (let i = 0; i < users.length; i++) {
            updateRow(users[i]);
        }
    });
    table.appendChild(div);
}

function updateRow(user) {
    var div = document.getElementById("tableDiv");
    var tr = document.createElement('tr');
    tr.id = 'tr' + user.id;
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
    tr.appendChild(tdRoles);

    var tdInputEdit = document.createElement('td');
    var inputEdit = document.createElement('a');
    inputEdit.type = "button";
    inputEdit.className = "btn btn-info";
    inputEdit.innerHTML = "Edit";
    inputEdit.href = "#";
    inputEdit.dataset.toggle = "modal";
    inputEdit.dataset.target = "#editUser";
    inputEdit.onclick = function () {
        findUser(user.id);
    };
    tdInputEdit.appendChild(inputEdit);
    tr.appendChild(tdInputEdit);

    var tdInputDelete = document.createElement('td');
    var inputDelete = document.createElement('a');
    inputDelete.type = "button";
    inputDelete.className = "btn btn-danger";
    inputDelete.dataset.toggle = "modal";
    inputDelete.dataset.target = "#deleteUser";
    inputDelete.innerHTML = "Delete";
    inputDelete.href = "#";
    inputDelete.onclick = function () {
        findUserToDelete(user.id);
    };
    tdInputDelete.appendChild(inputDelete);
    tr.appendChild(tdInputDelete);
    div.appendChild(tr);
}

function getRoleByUser(user) {
    return user.rolesByUser;
}

function getRolesEdit() {
    var select = document.getElementById("listRole");
    $.get("/admin/roles", function (roles) {
        for (let i = 0; i < roles.length; i++) {
            var option = "<option id='" + roles[i].id + "' value='" + roles[i].role + "'>" + roles[i].role + "</option>";
            select.insertAdjacentHTML('afterBegin', option);
        }
    });

}

function getRolesAdd() {
    var select = document.getElementById("listRoles");
    $.get("/admin/roles", function (roles) {
        for (let i = 0; i < roles.length; i++) {
            var option = "<option id='" + roles[i].id + "' value='" + roles[i].role + "'>" + roles[i].role + "</option>";
            select.insertAdjacentHTML('afterBegin', option);
        }
    });
}

function getRolesDelete() {
    var select = document.getElementById("list");
    $.get("/admin/roles", function (roles) {
        for (let i = 0; i < roles.length; i++) {
            var option = "<option id='" + roles[i].id + "' value='" + roles[i].role + "'>" + roles[i].role + "</option>";
            select.insertAdjacentHTML('afterBegin', option);
        }
    });
}


function findUser(userId) {
    $.get("/admin/user",
        {id: userId},
        function (user) {
            document.getElementById("idEdit").value = user.id;
            document.getElementById("firstNameEdit").value = user.firstName;
            document.getElementById("lastNameEdit").value = user.lastName;
            document.getElementById("ageEdit").value = user.age;
            document.getElementById("emailEdit").value = user.email;
            getRolesEdit();
        });
}

function findUserToDelete(userId) {
    $.get("/admin/user",
        {id: userId},
        function (user) {
            document.getElementById("idDelete").value = user.id;
            document.getElementById("firstNameDelete").value = user.firstName;
            document.getElementById("lastNameDelete").value = user.lastName;
            document.getElementById("ageDelete").value = user.age;
            document.getElementById("emailDelete").value = user.email;
            getRolesDelete();
        });
}

function addUser() {
    var role = getSelectAdd();
    var user = {
        firstName: $("#firstNameAdd").val(),
        lastName: $("#lastNameAdd").val(),
        age: $("#ageAdd").val(),
        email: $("#emailAdd").val(),
        password: $("#passwordAdd").val(),
        roles: role
    }

    $.ajax({
        url: "/admin/add",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function () {
            var str = "<tr id='tr" + user.id + "'>" +
                "<td>" + user.id + "</td>" +
                "<td>" + user.firstName + "</td>" +
                "<td>" + user.lastName + "</td>" +
                "<td>" + user.age + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + user.roles + "</td>" +
                "<td>" + "<a type= 'button' class='btn btn-info'  href= '#' data-toggle = 'modal' " +
                "data-target='#editUser' onclick='findUser(" + user.id + ")'>Edit</a>" + "</td>" +
                "<td>" + "<a class='btn btn-danger' href= '#' data-toggle = 'modal' " +
                "data-target='#deleteUser' onclick='findUserToDelete(" + user.id + ")'>Delete</a>" + "</td>" +
                "</tr>"
            $('#tr' + user.id).replaceWith(str)
        }
    });
}


function deleteUser() {
    $.ajax({
        url: "/admin/delete",
        type: "DELETE",
        data: {id: $("#idDelete").val()},
        success: function () {
            $('#tr' + $("#idDelete").val()).remove();
        }
    });
}

function editUser() {
    var role = getSelectEdit();
    var user = {
        id: $("#idEdit").val(),
        firstName: $("#firstNameEdit").val(),
        lastName: $("#lastNameEdit").val(),
        age: $("#ageEdit").val(),
        email: $("#emailEdit").val(),
        password: $("#passwordEdit").val(),
        roles: role
    }
    $.ajax({
        url: "/admin/edit",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(user),

        success: function () {
            var str = "<tr id='tr" + user.id + "'>" +
                "<td>" + user.id + "</td>" +
                "<td>" + user.firstName + "</td>" +
                "<td>" + user.lastName + "</td>" +
                "<td>" + user.age + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + user.roles + "</td>" +
                "<td>" + "<a type= 'button' class='btn btn-info'  href= '#' data-toggle = 'modal' " +
                "data-target='#editUser' onclick='findUser(" + user.id + ")'>Edit</a>" + "</td>" +
                "<td>" + "<a class='btn btn-danger' href= '#' data-toggle = 'modal' " +
                "data-target='#deleteUser' onclick='findUserToDelete(" + user.id + ")'>Delete</a>" + "</td>" +
                "</tr>"
            $('#tr' + user.id).replaceWith(str)
        }
    });
}

function getSelectAdd() {
    var select = document.getElementById("listRoles");

    var options = select.getElementsByTagName('option'),
        values = [];

    for (let i = options.length; i--;) {
        if (options[i].selected) values.push(options[i].value)
    }
    return values;
}

function getSelectEdit() {
    var select = document.getElementById("listRole");

    var options = select.getElementsByTagName('option'),
        values = [];

    for (let i = options.length; i--;) {
        if (options[i].selected) values.push(options[i].value)
    }
    return values;
}

function loadUser(email) {
    $.get("/admin/user-info",
        {email: email},
        function (user) {
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