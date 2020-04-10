/*Scharss https://scharss.github.io*/

var config = {
    apiKey: "AIzaSyB0j29oc-iBMcr5Wc01ufweYDKBoweqxq0",
    authDomain: "dominux-dbbfa.firebaseapp.com",
    databaseURL: "https://dominux-dbbfa.firebaseio.com",
    projectId: "dominux-dbbfa",
    storageBucket: "dominux-dbbfa.appspot.com",
    messagingSenderId: "333041873485",
    appId: "1:333041873485:web:1c93072ea49f9ca6df6204",
    measurementId: "G-7T3G467RXL"
};
firebase.initializeApp(config);

var d = new Date();
var t = d.getTime();
var counter = t;

//******************************************* */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat);
    console.log(long);

    //****************************************** */

    document.getElementById("form").addEventListener("submit", (e) => {
        var task = lat.toFixed(20);
        var description = long.toFixed(20);
        e.preventDefault();
        createTask(task, description);
        form.reset();
    });
}

function createTask(taskName, description) {
    console.log(counter);
    counter += 1;
    console.log(counter);
    var task = {
        id: counter,
        task: taskName,
        description: description
    }
    let db = firebase.database().ref("task/" + counter);
    db.set(task);
    document.getElementById("cardSection").innerHTML = '';
    readTask();
}

function readTask() {
    var task = firebase.database().ref("task/");
    task.on("child_added", function(data) {
        var taskValue = data.val();

        document.getElementById("cardSection").innerHTML += `
  <div class="card mb-3">
    <div class="card-body" style="background-color:#DFE3EA">
             <h5 class="card-title">${taskValue.task}</h5>
             <p class="card-text">${taskValue.description}</p>
             <p><button type="submit" style="color:white" class="btn btn-dark" onclick="updateTask(${taskValue.id},'${taskValue.task}','${taskValue.description}')"><i class="fas fa-edit"></i> Editar Ubicación GPS</button></p>
             <button type="submit" class="btn btn-dark" onclick="deleteTask(${taskValue.id})"><i class="fas fa-trash-alt"></i> Borrar Ubicación GPS</button>
    </div>
  </div>
  
  `

    });
}

function reset() {
    document.getElementById("firstSection").innerHTML = `
  
  <form class="border p-4 mb-4" id="form">

               

               
                
                <button type="submit" id="button1" class="btn btn-dark"><i class="fas fa-plus"></i> Agregar Ubicación GPS</button>
                <button style="display: none" id="button2" class="btn btn-dark"> Editar Ubicación GPS</button>  
                <button style="display: none" id="button3" class="btn btn-dark">Cancelar</button>  
                
                </form>
  
  `;
    document.getElementById("form").addEventListener("submit", (e) => {
        var task = document.getElementById("task").value;
        var description = document.getElementById("description").value;
        e.preventDefault();
        createTask(task, description);
        form.reset();
    });
}

function updateTask(id, name, description) {
    document.getElementById("firstSection").innerHTML = `
                <form class="border p-4 mb-4 " id="form2">

               
                
                <p><button  style="display: none" id="button1" class="btn btn-dark"><i class="fas fa-plus"></i> Agregar Ubicaión GPS</button></p>
                <p><button type="submit" style="display: inline-block" id="button2" class="btn btn-dark"><i class="fas fa-sync-alt"></i> Actualizar Ubicaión GPS</button></p>  
                <p><button  style="display: inline-block" id="button3" class="btn btn-dark"><i class="fas fa-ban"></i> Cancelar</button></p>  
                
                </form>

  `;
    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    document.getElementById("button3").addEventListener("click", (e) => {
        reset();
    });
    document.getElementById("button2").addEventListener("click", (e) => {
        updateTask2(id, document.getElementById("task").value, document.getElementById("description").value);
    });
    document.getElementById("task").value = name;
    document.getElementById("description").value = description;
}

function updateTask2(id, name, description) {
    var taskUpdate = {
        task: name,
        id: id,
        description: description
    }
    let db = firebase.database().ref("task/" + id);
    db.set(taskUpdate);

    document.getElementById("cardSection").innerHTML = '';
    readTask();
    reset();
}

function deleteTask(id) {
    var task = firebase.database().ref("task/" + id);
    task.remove();
    reset();
    document.getElementById("cardSection").innerHTML = '';
    readTask();
}
