const buttonAñadir = document.getElementById("buttonAñadir");
const divAñadir = document.getElementById("divAñadir");
const divTarea = document.getElementById("divTarea");
const guardarAñadir = document.getElementById("guardarAñadir");
const textAñadir = document.getElementById("textAñadir");
const cancelarAñadir = document.getElementById("cancelarAñadir");
const cuerpo = document.getElementById("cuerpo");

$(divAñadir).hide();
$(divTarea).hide();

buttonAñadir.onclick = function() {
    if ($(divAñadir).is(":visible")) {
        $(divAñadir).hide();
    } else {
        $(divAñadir).show();
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
    div.remove();
}

function guardarTarea(div, text) {
    //Cambiamos el id del div
    div.removeAttr("id");
    var string = "div";
    string = string.concat(text.attr("value"));
    div.attr("id", string);

    //Buscamos el boton de la Tarea y le cambiamos el texto
    var button = div.find(".buttonTarea");
    button.html(text.attr("value"));

    //Buscamos la estructura de la tarea y la escondemos
    var divaux = div.find(".divModificar");
    divaux.hide();

    //Cambiamos el placeholder del input
    text.attr("placeholder", text.attr("value"));

    //Borramos el texto del input
    text.attr("value", "");
}

function cancelarTarea(div, text) {
    text.attr("value", "");
    div.hide();

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