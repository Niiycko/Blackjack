/*append
2C = DOS DE TREBOLES.
2D = DOS DE DIAMANTES.
2H = DOS DE CORAZONES.
2S = DOS DE ESPADAS.
*/ 
let deck         = [  ];
const tipos      = [ 'C','D','H','S' ];
const especiales = [ 'A','J','Q','K' ];

//PARA SABER EL PUNTAJE DE LAS CARTAS CREAMOS 2 VARIABLES:
let puntosJugador = 0,
    puntosComputadora = 0;

// REFERENCIAS HTML:

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
// CONSTANTE PARA SELECCIONAR ELEMENTOS HTML(SMALLS).
const puntosHTML = document.querySelectorAll( 'small' );

// PARA CARTAS DIFERENTES:

const divCartasJugador = document.querySelector( '#jugador-cartas' );
const divCartasComputadora = document.querySelector( '#computadora-cartas' );


//FUNCION PARA CREAR NUEVO DECK:
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
       for( let tipo of tipos ) {
        deck.push( i + tipo );// PARA AÑADIR.
       };
    };
    // console.log( deck );
    deck = _.shuffle( deck ); // IMPORTA DE UNDERSCORE.
    console.log( deck );
    return deck;
};

crearDeck();

// PARA TOMAR UNA NUEVA CARTA:
const pedirCarta = () => {
// THROW PARA FORZAR ERROR EN CONSOLA Y NO SE SIGA EJECUTANDO EL PROGRAMA.
// .POP = ELIMINA EL ULTIMO ELEMENTO DE UN ARRAY Y DEVUELVE SU VALOR
// AL ELEMENTO QUE LO LLAMO.
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck.';
    }

    const carta = deck.pop();

    /*
    console.log( deck );
    console.log( carta );
    */
    return carta;

}
/*
for( let i = 0; i <= 100; i++ ){
    pedirCarta();
}
*/
//SUBSTRING = REGRESA UN NUEVO STRING CORTADO EN BASE A LA POSICION INICIAL
// Y UN FINAL QUE PODEMOS DEFINIR.
const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length -1 );
    /*let puntos = 0;
    if( isNaN( valor ) ) {
        puntos = ( valor === 'A' ) ? 11 : 10; // TERNARIO.
    } else {
        puntos = valor * 1;
    }
    console.log( puntos )
    */
   //LO MISMO PERO RESUMIDO:
   return ( isNaN( valor )) ? 
          ( valor === 'A' ) ? 11 : 10
          : valor *1;
};
// isNaN = EVALUA SI EL VALOR ES NUMERICO.(REGRESA TRUE SI NO ES UN N°).
/*
const valor = valorCarta( 'KD' );
console.log({ valor });
*/

// TURNO DE LA COMPUTADORA:
const turnoComputadora = ( puntosMinimos ) => {

     do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');// CREAR IMAGEN
        imgCarta.src = `assets/cartas/${ carta }.png`; // SOURCE
        imgCarta.classList.add('carta'); // CLASE CSS
        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }

     } while( (puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21) );

     setTimeout(() => {
     if ( puntosComputadora === puntosMinimos ) {
        alert('Nadie gana...');
     } else if ( puntosMinimos > 21 ) {
        alert( 'Computadora gana!' )
     } else if ( puntosComputadora > 21 ) {
        alert('Jugador Gana!')
     } else {
        alert( 'Computadora Gana!' )
     }
    }, 10 );
}


// Eventos:
// CALLBACK = FUNCION QUE SE COLOCA COMO ARGUMENTO DENTRO DE OTRA FUNCION.
//<!--<img class="carta" src="/assets/cartas/10C.png" alt="">-->//
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');// CREAR IMAGEN
    imgCarta.src = `assets/cartas/${ carta }.png`; // SOURCE
    imgCarta.classList.add('carta'); // CLASE CSS
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Perdiste!');
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21 ) {
        console.warn( '21, genial!' );
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );

});
// BOTON NUEVO JUEGO:
btnNuevo.addEventListener('click', () => {
   console.clear(); // LIMPIA LA CONSOLA.
   
   deck = [];
   deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});






