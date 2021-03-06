const buttonAñadir = document.getElementById("buttonAñadir");
const divAñadir = document.getElementById("divAñadir");
const divTarea = document.getElementById("divTarea");
const guardarAñadir = document.getElementById("guardarAñadir");
const textAñadir = document.getElementById("textAñadir");
const cancelarAñadir = document.getElementById("cancelarAñadir");
const cuerpo = document.getElementById("cuerpo");
const body = document.body;
var tareas = [];

body.onload = function() {
    var array = JSON.parse(this.localStorage.getItem('tareas'));
    if (array !== null) {
        tareas = array;
        array.forEach(element => crearTarea(element));
    }
}



$(divAñadir).hide();
$(divTarea).hide();

buttonAñadir.onclick = function() {
    if ($(divAñadir).is(":visible")) {
        $(divAñadir).hide();
    } else {
        $(divAñadir).show();
    }
}

guardarAñadir.onclick = function() {


    if ($(textAñadir).val().length == 0) {
        alert('Debe introducir un nombre a la tarea')
    } else {
        //Clonamos la estructura de una tarea
        var clone = $(divTarea).clone().appendTo($(cuerpo));

        //Cambiamos el id del div
        clone.removeAttr("id");
        var string = "div";
        string = string.concat($(textAñadir).val());
        clone.attr("id", string);

        //Buscamos el boton de la Tarea y le cambiamos el texto
        var button = clone.find(".buttonTarea");
        button.html($(textAñadir).val());

        //LocalStorage
        tareas.push($(textAñadir).val());
        localStorage.setItem('tareas', JSON.stringify(tareas));

        //Buscamos la estructura de la tarea y la escondemos
        var div = clone.find(".divModificar");
        div.hide();

        //Añadimos la función onclick al boton de la tarea
        button.bind('click', function() { procesaTarea(div); });

        //Buscamos el input y le cambiamos el texto
        var text = clone.find(".textModificar");
        text.attr("placeholder", $(textAñadir).val())

        //Buscamos el div de los botones
        //Buscamos los botones y le damos una funcionalidad
        var divButtons = div.find(".buttonsTarea");
        var auxButton = divButtons.find("#cancelarTarea");


        auxButton.bind('click', function() { cancelarTarea(div, text); });
        auxButton = divButtons.find("#guardarTarea");
        auxButton.bind('click', function() { guardarTarea(clone, text); });
        auxButton = divButtons.find("#eliminarTarea");
        auxButton.bind('click', function() { eliminarTarea(clone); });


        //mostramos la tarea creada
        clone.show();

        //Escondemos el div de añadir una tarea y borramos su input
        $(textAñadir).attr("value", "");
        $(divAñadir).hide();

    }

}


cancelarAñadir.onclick = function() {
    $(textAñadir).attr("value", "");
    $(divAñadir).hide();
}

function procesaTarea(div) {
    if (div.is(':visible')) {
        div.hide();
    } else {
        div.show();
    }
}

function eliminarTarea(div) {

    var old_name = div.attr("id");
    var clear_old_name = old_name.slice(3, old_name.lenght);

    tareas.splice(tareas.indexOf(clear_old_name), 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));


    div.remove();
}

function guardarTarea(div, text) {
    if (text.attr("value") === '') {
        alert('Debe introducir un nombre a la tarea')
    } else {
        //LocalStorage
        var old_name = div.attr("id");
        var clear_old_name = old_name.slice(3, old_name.lenght);

        //Cambiamos el id del div
        div.removeAttr("id");
        var string = "div";
        string = string.concat(text.attr("value"));
        div.attr("id", string);

        //Buscamos el boton de la Tarea y le cambiamos el texto
        var button = div.find(".buttonTarea");
        button.html(text.attr("value"));

        //LocalStorage
        tareas[tareas.indexOf(clear_old_name)] = text.attr("value");
        localStorage.setItem('tareas', JSON.stringify(tareas));


        //Buscamos la estructura de la tarea y la escondemos
        var divaux = div.find(".divModificar");
        divaux.hide();

        //Cambiamos el placeholder del input
        text.attr("placeholder", text.attr("value"));

        //Borramos el texto del input
        text.attr("value", "");
    }
}

function cancelarTarea(div, text) {
    text.attr("value", "");
    div.hide();

}

function crearTarea(textAñadir) {
    //Clonamos la estructura de una tarea
    var clone = $(divTarea).clone().appendTo($(cuerpo));

    //Cambiamos el id del div
    clone.removeAttr("id");
    var string = "div";
    string = string.concat(textAñadir);
    clone.attr("id", string);

    //Buscamos el boton de la Tarea y le cambiamos el texto
    var button = clone.find(".buttonTarea");
    button.html(textAñadir);

    //Buscamos la estructura de la tarea y la escondemos
    var div = clone.find(".divModificar");
    div.hide();

    //Añadimos la función onclick al boton de la tarea
    button.bind('click', function() { procesaTarea(div); });

    //Buscamos el input y le cambiamos el texto
    var text = clone.find(".textModificar");
    text.attr("placeholder", textAñadir);

    //Buscamos el div de los botones
    //Buscamos los botones y le damos una funcionalidad
    var divButtons = div.find(".buttonsTarea");
    var auxButton = divButtons.find("#cancelarTarea");


    auxButton.bind('click', function() { cancelarTarea(div, text); });
    auxButton = divButtons.find("#guardarTarea");
    auxButton.bind('click', function() { guardarTarea(clone, text); });
    auxButton = divButtons.find("#eliminarTarea");
    auxButton.bind('click', function() { eliminarTarea(clone); });


    //mostramos la tarea creada
    clone.show();


}