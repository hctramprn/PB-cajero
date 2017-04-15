//Constructor que genera la clase Billete y les asigna los atributos valor y cantidad
class Billete {
  constructor(v, c) {
    this.valor = v;
    this.cantidad = c;
  }
}

//Función encargada de entregar el dinero especificado por el cliente
function entregarDinero() {
  //Vacía el array entregado en caso de que ya se haya utilizado con anterioridad
  entregado = [];
  /*Importa el elemento "dinero" desde el HTML que es en donde el usuario especifica
  la cantidad que desea retirar del cajero. También convierte el valor a un
  número entero*/
  var t = document.getElementById("dinero");
  dinero = parseInt(t.value);
  /*Algoritmo que se encarga de recorrer todos los billetes disponibles en caja
  para ir juntando la cantidad solicitada por el usuario*/
  for (var bi of caja) {
    if (dinero > 0) {
      div = Math.floor(dinero / bi.valor);
      if (div > bi.cantidad) {
        papeles = bi.cantidad
      }
      else {
        papeles = div;
      }
      entregado.push(new Billete(bi.valor, papeles));
      dinero = dinero - (bi.valor * papeles)
    }
  }
  /*Si después de pasar el algoritmo, dinero sigue siendo mayor que cero,
  quiere decir que el cajero no puede entregar esa cantidad y por lo tanto
  escribe en el documento HTML que no puede entregar esa cantidad*/
  if (dinero > 0) {
    resultado.innerHTML = "No puedo entregar esa cantidad de dinero";
  }
  else {
    //De lo contrario, recorre todo el array de entregado y lo escribe en el documento
    resultado.innerHTML = "<strong>Se entregaron $" + t.value + " pesos en forma de:</strong><br>";
    for (var e of entregado) {
      if (e.cantidad > 0) {
        if (e.cantidad == 1) {
          resultado.innerHTML += e.cantidad + " billete de $" + e.valor + "<br>";
        }
        else {
          resultado.innerHTML += e.cantidad + " billetes de $" + e.valor + "<br>";
        }
      }
    }
    //Ejecuta las funciones sobra() y saldo()
    sobra();
    saldo();
    //Empuja el número de la operación y el monto a un array llamado operación
    operacion.push("Operación #" + numOperacion + " por un monto de $" + t.value);
    numOperacion = operacion.length + 1;
  }

}

/*Variables necesarias para el monto soicitado por el cliente, billetes
disponibles y entregados*/
var dinero = 0;
var caja = [];
var entregado = [];

//Se meten los billetes con monto y cantidad al array caja
caja.push( new Billete(50, 30) );
caja.push( new Billete(20, 25) );
caja.push( new Billete(10, 40) );

//Variables necesarias para la ejecución del algoritmo en entregarDinero()
var div = 0;
var papeles = 0;

//Código para importar las etiquetas P desde el HTML
var resultado = document.getElementById("resultado");
var b = document.getElementById('extraer');
//Código para ejecutar la función entregarDinero() en caso de click o enter
b.addEventListener("click", entregarDinero);
document.addEventListener("keydown", teclaEnter);

//Diccionario del keyCode para la tecla Enter
var tEnter = 13;

//Comprueba que la tecla oprimida haya sido enter para ejecutar entregarDinero()
function teclaEnter(evento) {
  if (evento.keyCode == tEnter) {
    entregarDinero();
  }
}

//Resta el dinero entregado a la cantidad de billetes en caja
function sobra() {
  for (var entre of entregado) {
    for (var din of caja) {
      if (entre.valor == din.valor) {
        var resta = din.cantidad - entre.cantidad;
        din.cantidad = resta;
      }
    }
  }
}

//Escribe en la consola la cantidad de billetes que quedan en la caja
function saldo() {
  console.log("Operación #" + numOperacion + ". Billetes restantes:");
  for (var billete of caja) {
    if (billete.cantidad == 1) {
      console.log(billete.cantidad + " billete de $" + billete.valor);
    }
    else {
      console.log(billete.cantidad + " billetes de $" + billete.valor);
    }
  }
}

//Arrays que contendrán la cantidad de operaciones realizadas en el cajero
var operacion = [];
var numOperacion = operacion.length + 1;
