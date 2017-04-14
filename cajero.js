class Billete {
  constructor(v, c) {
    this.valor = v;
    this.cantidad = c;
  }
}

function entregarDinero() {
  entregado = [];
  var t = document.getElementById("dinero");
  dinero = parseInt(t.value);
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
      dinero = dinero -(bi.valor * papeles)
    }
  }

  if (dinero > 0) {
    resultado.innerHTML = "No puedo entregar esa cantidad de dinero";
  }
  else {
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
    sobra();
    saldo();
    operacion.push("Operación #" + numOperacion + " por un monto de $" + t.value);
    numOperacion = operacion.length + 1;
  }

}

var dinero = 0;
var caja = [];
var entregado = [];

caja.push( new Billete(50, 30) );
caja.push( new Billete(20, 25) );
caja.push( new Billete(10, 40) );

var div = 0;
var papeles = 0;

var resultado = document.getElementById("resultado");
var b = document.getElementById('extraer');
b.addEventListener("click", entregarDinero);
document.addEventListener("keydown", teclaEnter);

var tEnter = 13;

function teclaEnter(evento) {
  if (evento.keyCode == tEnter) {
    entregarDinero();
  }
}

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

var operacion = [];
var numOperacion = operacion.length + 1;
