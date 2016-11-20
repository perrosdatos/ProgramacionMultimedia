Reveal.initialize({
				controls: true,
				progress: true,
				history: true,
				center: true,

				transition: 'slide', // none/fade/slide/convex/concave/zoom

				// More info https://github.com/hakimel/reveal.js#dependencies
				dependencies: [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: 'plugin/zoom-js/zoom.js', async: true },
					{ src: 'plugin/notes/notes.js', async: true }
				]
			});



var cnv;
var tiempoSlide=0;
//Evento que se ejecuta cuando cambiamos de diapositiva
Reveal.addEventListener( 'slidechanged', function( event ) {

	if(cnv){
		var elemento="canvas"+event.indexh+"-"+event.indexv;
		//Cambia el canvas al contenedor que le corresponde 
		if(document.getElementById(elemento)){
			cnv.parent(elemento);
		}
		//Re-inicializa el tiempo que ha transcurrido en la actual diapositiva
		tiempoSlide=0;
	}

} );


function setup(){
	//Inicializa el canvas al 80% del tamaño de la pantalla
	cnv= createCanvas(windowWidth*0.7, windowHeight*0.8);
	//Direcciona el canvas a la diapositiva 0,0
	try{
		cnv.parent("canvas0-0");
	}catch(e){
		cnv.parent("canvas1-0");
	}
	
}
function draw(){
	//Pinta el fondo 
	background(140,140,140);
	//Obtiene el slide actual
	var state = Reveal.getState();
	//Dibuja el canvas correspondiente a la slide actual
	dibujaSlide(state.indexh,state.indexv);
	//Transcurre una iteración en esta diapositiva
	tiempoSlide++;
}

//Manda a llamar las funciones correspondientes a cada diapositiva
function dibujaSlide(x,y){
	if(x==1 && y==0){
		plantilla1_0();
	}
	else if(x==2 && y==0){
		plantilla2_0();
	}
}
/*Definición de las funciones de pintado*/
function plantilla1_0(){
	var tiempoRelativo = tiempoSlide*2;
	translate(width/2,height/2);
	//rotate();

	stroke("white");
	noFill();
	arc(100,100,100,100,0,(PI/180)*tiempoRelativo);
	var angulo=PI/180;
	for (var i = 0 ; i < tiempoRelativo%(360); i++) {
			var x=Math.sin(angulo*i);
			var y=Math.cos(angulo*i);
			stroke(255,255,255);
			line(-100+100*x,-200+100*y,100+100*x,100+100*y);
			stroke(255,30,i*2);
			line(-100-50*x,-200-50*y,100+50*x,100+50*y);
	}
	arc(-100,-200,100,100,0,(PI/180)*tiempoRelativo);
	//noFill();
	

}
function plantilla2_0(){
	
	translate(width/2,height/2);
	//rotate();
	stroke("white");
	noFill();
	arc(-100,-100,100,0,tiempoSlide/60);

}
/*Función que se ejecuta cuando el tamaño de la pantalla cambia(para que el canvas sea responsivo)*/
function windowResized() {
  resizeCanvas(windowWidth*0.7, windowHeight*0.8);
}