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

//Evento que se ejecuta cuando cambiamos de diapositiva
var diapositivaX=0;
var diapositivaY=0;
Reveal.addEventListener( 'slidechanged', function( event ) {

	if(diapositivaX != event.indexh || diapositivaY != event.indexv ){
		tiempoSlide=0;
	}else{
		return;
	}
	diapositivaX = event.indexh ;
	diapositivaY = event.indexv;
	if(event.previousSlide.id == "diapositiva0-0"){
		video.pause();	
		document.body.style.background = "#222";
		document.body.style.backgroundColor = "#222";
		resizeCanvas(windowWidth*0.7, windowHeight*0.8);
		mitadX=width/2;
		mitadY=height/2;
	}
} );
