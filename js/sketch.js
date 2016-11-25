var song;
var cnv;
var video;
var particulas=[];
var mariposa=[];
var mariposas=[];
var tiempoSlide=0;
var antesMouseX=0;
var antesMouseY=0;
var velocidadX=0;
var velocidadY=0;
var velocidad=0;
var acumulador=0;
var mitadX=0;
var mitadY=0;
var microfono;
var nivelMicrofono;
var diapositiva1_3 = "El uso de la programación para crear arte es una práctica"+
					 " que comenzó en los años sesenta. En décadas posteriores, "+
					 "grupos como el Compos 68 exploraron con éxito la programación "+
					 "con fines artísticos, presentando su obra en exposiciones "+
					 "internacionales. A partir de los años 80, los programadores "+
					 "expertos se unieron al 'Demoscene', y probaron sus habilidades "+
					 "entre sí creando 'demos': creaciones visuales altamente "+
					 "técnicamente competentes.";

var diapositiva2_3 = "En el siglo XVIII estuvo en su apogeo y se  "+
					 "diversifico las primeras creaciones sobre visualización de datos  "+
					 "que fueron planteadas durante los años anteriores. "+
					 "En el siglo XIX hubo un gran crecimiento con respecto a "+
					 "los gráficos estadísticos y mapas temáticos. "+
					 "En este siglo las metodologias utilizadas para representar los Datos era"+
					 "a través de tablas tabulares o graficamente con cuadros y diagramas."+
					 "Pero fue hasta el siglo XX que se empezo a hacer la visualizacion de graficos en 2D y 3D"+
					 "Aun que el termino \"visualización de datos\"  como tal  "+
					 "surgio en 1990 con el nacimiento de la web 2.0.";

function recolocaCanvas(event){
	if(cnv){
		var elemento="canvas"+event.indexh+"-"+event.indexv;
		//Cambia el canvas al contenedor que le corresponde 
		if(document.getElementById(elemento)){
			cnv.parent(elemento);
			//windowResized();
		}

		//Re-inicializa el tiempo que ha transcurrido en la actual diapositiva
		tiempoSlide=0;
	}

}
function preload(){

	
	mariposa[0]  = loadImage("./imagen/mariposa-0.png"); 
	mariposa[1]  = loadImage("./imagen/mariposa-1.png"); 
	mariposa[2]  = loadImage("./imagen/mariposa-2.png"); 
	mariposa[3]  = loadImage("./imagen/mariposa-3.png"); 
	microfono = new p5.AudioIn();
	//Reproduce un video en canvas
	video = createVideo("./videos/planeta.mp4");
	video.play();
	video.hide();
	video.pause();
	//sonido
	song=loadSound("./sonido/Vd.mp3");
}
function setup(){
	//Inicializa el canvas al 80% del tamaño de la pantalla
	cnv= createCanvas(windowWidth*0.7, windowHeight*0.8);
	mitadX=width/2;
	mitadY=height/2;
	microfono.start();
	//Direcciona el canvas a la diapositiva 0,0
	/*try{
		cnv.parent("canvas0-0");
	}catch(e){
		cnv.parent("canvas1-0");
	}*/
	
}
function draw(){
	//Obtiene el slide actual
	var state = Reveal.getState();

	if(tiempoSlide==0){
		limpiaCanvas();
		recolocaCanvas(state);

	}
	//Dibuja el canvas correspondiente a la slide actual
	dibujaSlide(state.indexh,state.indexv);
	//Transcurre una iteración en esta diapositiva
	tiempoSlide++;
	//Guarda los valores del mouse
	velocidadX	= mouseX - antesMouseX;
	velocidadY	= mouseY - antesMouseY;
	velocidad	= velocidadY/velocidadX;
	antesMouseY=mouseY;
	antesMouseX=mouseX;
}
function limpiaCanvas(){
	//Pinta el fondo 
	background("#222");

}
//Manda a llamar las funciones correspondientes a cada diapositiva
function dibujaSlide(x,y){
	if(x==0 && y==0){
		plantilla0_0();
	}
	else if(x==1 && y==0){
		plantilla1_0();
	}
	else if(x==1 && y==1){

		plantilla1_1();
	}
	else if(x==1 && y==2){

		plantilla1_2();
	}
	else if(x==2 && y==0){
		plantilla2_0();
	}
	else if(x==2 && y==1){
		plantilla2_1();
	}
	else if(x==2 && y==2){
		plantilla2_2();
	}
}
/*Definición de las funciones de pintado*/
function plantilla1_0(){
	
	if(tiempoSlide==0){
		//antesMouseY=mouseY;
		//antesMouseX=mouseX;
		acumulador=0;

	}else if(velocidadX!= 0){
		acumulador +=velocidad;
	}
	var tiempoRelativo = tiempoSlide*2;
	translate(width/2,height/2);
	rotate(acumulador);

	stroke("white");
	noFill();
	var angulo=PI/180;
	var i =  tiempoRelativo%(360);
	var x=Math.sin(angulo*i);
	var y=Math.cos(angulo*i);

	stroke(255,255,255);
	point(-100-50*x,-150-50*y);
	
	line(-100+100*x,-150+100*y,100+100*x,100+100*y);
	stroke(255,30,i*2);
	line(-100-50*x,-150-50*y,100+50*x,100+50*y);
	
	point(100+50*x,100+50*y);
	//noFill();
	

}
var recursion=0;
function plantilla0_0(){

	if(tiempoSlide == 0){
		document.body.style.background 		= "rgba(22,22,22,0.3)";
		document.body.style.backgroundColor	= "rgba(22,22,22,0.3)";

		video.loop();
		video.hide();
		console.log("1");
		recursion++;
		if(recursion>2){
			recursion=0;
			return;
		}
			window.dispatchEvent(new Event('resize'));
		recursion=0;
	}
	image(video,0,0,width,height);
}
function plantilla1_1(){

	if(tiempoSlide==0){
		var colors=["red","green","blue","yellow"];
		mariposas= new Array();
		mariposas.push({
			x: mouseX,
			y: mouseY,
			step: 0,
			tint: colors[0] 
		});
	}
	if(mouseIsPressed){
		var colors=["red","green","blue","yellow"];
		var tamano = mariposas.length;
		mariposas.push({
			x: mouseX,
			y: mouseY,
			step: 0,
			tint: colors[tamano%4] 
		});
	}
	limpiaCanvas();
	stroke("white");
	mitadX=width/2;
	mitadY=height/2;
	line(mitadX,0,mitadX,height);
	line(0,mitadY,width,mitadY);
	var angulo=(2*PI)/mariposas.length;
	var radio=200;
	for (var i = mariposas.length -1 ; i >= 0 ; i--) {
		tint(mariposas[i].tint);
		stroke(mariposas[i].tint);
		point(mitadX+200*Math.sin(angulo*i),mitadY+200*Math.cos(angulo*i));
		var imagen=mariposa[mariposas[i].step%4];
		image(imagen,imagen.width/2,0,imagen.width/2,imagen.height,mariposas[i].x - imagen.width/4 ,mariposas[i].y - imagen.height/2,imagen.width/2,imagen.height);
		//image(mariposa[mariposas[i].step%4],mariposas[i].x,mariposas[i].y);
		mariposas[i].step++;
		var aleatorio=random(20);
		if(mariposas[i].x < mitadX+radio*Math.sin(angulo*i)){
			mariposas[i].x += aleatorio;
		}else{
			mariposas[i].x -= aleatorio;
		} 
		aleatorio=random(20);
		if(mariposas[i].y < mitadY+radio*Math.cos(angulo*i)){
			mariposas[i].y += aleatorio;
		}else{
			mariposas[i].y -= aleatorio;
		}

	}
}
function plantilla1_2(){
	var indice	=	Math.floor((tiempoSlide/10));
	limpiaCanvas();
	if((velocidadX>5  || velocidadX < -5)&& mouseIsPressed){

		tiempoSlide-=velocidadX;
	}
	if(tiempoSlide<0){
		tiempoSlide=0;
	}
	if(indice>diapositiva1_3.length){
		tiempoSlide= tiempoSlide%diapositiva1_3.length;
	}
	fill("white");
	stroke("white");
	text(diapositiva1_3.substring(indice),25,25);
	textSize(18);
	textFont("Georgia");
	translate(width/2,height/2);
	rotate((PI/45)*tiempoSlide);
	stroke(0,255,194);
	nivelMicrofono	=	microfono.getLevel();
	noFill();
	dibujaPoligono(0,0,100+150*nivelMicrofono,Math.floor((tiempoSlide/100)+2));
}
var datosGrafica=[
	{
		arreglo: [10,12,14,15,18,13,14,34,50,20],
		color:"rgba(200,0,0,0.5)"
	},
	{
		arreglo: [10,12,14,25,8,23,24,14,30,20],
		color:"rgba(0,200,0,0.5)"
	},
	{
		arreglo: [10,42,24,15,48,13,24,21,10,20],
		color:"rgba(0,0,200,0.5)"
	},
	{
		arreglo: [20,22,34,45,28,14,15,33,20,10],
		color:"rgba(120,120,0,0.5)"
	}
	
	
];

function plantilla2_0(){
	var escala=0;
	limpiaCanvas();
	stroke("white");
	line(0,height/2,width,height/2);
	line(30,0,30,height);
	translate(0,height/2);
	var maximo=0,minimo=0;
	for (var i = datosGrafica.length-1;i>=0;i--) {
		for (var j = datosGrafica[i].arreglo.length - 1; j >= 0; j--) {
			if(datosGrafica[i].arreglo[j]>maximo)
				maximo =datosGrafica[i].arreglo[j];
			if(datosGrafica[i].arreglo[j]<minimo)
				minimo =datosGrafica[i].arreglo[j];
		}
	}
	if(maximo<-minimo){
		maximo = -minimo;
	}
	escala = ((height/2)-30)/maximo;
	fill("white");
	stroke("white");
	textSize(14);
	textFont("Georgia");
	line(15,-maximo*escala,45,-maximo*escala);
	text(maximo,60,-maximo*escala +7);
	line(15,maximo*escala,45,maximo*escala);
	text(" - "+maximo,60,maximo*escala + 7);
	
	for (var i = datosGrafica.length-1;i>=0;i--) {
		stroke(datosGrafica[i].color);
		var ancho = width -30;
		var intervalo = ancho / datosGrafica[i].arreglo.length;
		for (var j = datosGrafica[i].arreglo.length - 1; j >= 0; j--) {
			strokeWeight(6);
			point(30+intervalo*j,-datosGrafica[i].arreglo[j]*escala);
			strokeWeight(2);
			line(30+intervalo*j,-datosGrafica[i].arreglo[j]*escala,30+intervalo*(j+1),-datosGrafica[i].arreglo[j+1]*escala);
			datosGrafica[i].arreglo[j] += map(random(2),0,2,-1,1);
		}
	}
	fill(0,0,random(255));
  arc(400, 195, 200,200, 0, HALF_PI);
  fill(255);
  text("25%", 430, 233);
  
  fill(random(255),0,0);
  arc(400, 195, 200,200, PI, TWO_PI);
  fill(255);
  text("37.5%", 400, 150);
  
  fill("yellow");
  arc(400, 195, 200,200, PI, PI+QUARTER_PI);
  fill("black");
  text("12.5%", 320, 180);
  
  fill(0,random(255),0);
  arc(400, 195, 200,200, HALF_PI, PI);
  fill("black");
  text("25%",350, 233);
}
function plantilla2_1(){
	if(tiempoSlide==0){
		particulas=[];
		particulas.push({
			color:"rgba(130,0,20,0.5)",
			x:mouseX,
			y:mouseY,
			radio:100
		});
	}
	if(mouseIsPressed){
		particulas.push({
			color:"rgba(130,0,20,0.5)",
			x:mouseX,
			y:mouseY,
			radio:50
		});
	}
	limpiaCanvas();
	for (var i = particulas.length - 1; i >= 0; i--) {
		fill(particulas[i].color);
		ellipse(particulas[i].x,particulas[i].y,2*particulas[i].radio,2*particulas[i].radio);
		particulas[i].x+= map(random(20),0,20,-10,10);
		particulas[i].y+= map(random(20),0,20,-10,10);
		if(particulas[i].x<0 + particulas[i].radio){
			particulas[i].x=0 + particulas[i].radio;
		}
		if(particulas[i].x > width -particulas[i].radio){
			particulas[i].x=width -particulas[i].radio;
		}
		if(particulas[i].y<0 + particulas[i].radio){
			particulas[i].y=0 + particulas[i].radio;
		}
		if(particulas[i].y> height -particulas[i].radio){
			particulas[i].y=height -particulas[i].radio;
		}
	}
}
function plantilla2_2(){
	if(tiempoSlide == 0){
		song.loop();
	}
	var indice	=	Math.floor((tiempoSlide/10));
	limpiaCanvas();
	
	if((velocidadX>5  || velocidadX < -5)&& mouseIsPressed){

		tiempoSlide-=velocidadX;
	}
	if(tiempoSlide<0){
		tiempoSlide=0;
	}
	if(indice>diapositiva2_3.length){
		tiempoSlide= tiempoSlide%diapositiva2_3.length;
	}
	
	fill("white");
	stroke("white");
	text(diapositiva2_3.substring(indice),25,25);
	textSize(20);
	textFont("Georgia");
	translate(width/2,height/2);
//	rotate((PI/45)*tiempoSlide);
	
	stroke(0,255,194);
	strokeWeight(0);
  fill(102,51,0);
  ellipse(80, 80, 130, 130);
  fill(255,229,204);
  ellipse(80, 80, 100, 100);
  fill(102,51,0);
  arc(80, 70, 100, 100, PI, TWO_PI);
  fill("black");
  ellipse(60, 80, 20, 20); 
  fill("black");
  ellipse(100, 80, 20,20);
  fill("white");
  ellipse(54, 76, 7, 7); 
  fill("white");
  ellipse(94, 76, 7,7);
  fill("black");
  ellipse(80, 100, 10, 10);
  fill("purple");
  ellipse(80,200,100,146);
  stroke(255,229,204);
  strokeWeight(20);
  line(115, 145, 160, 170);
  strokeWeight(20);
  line(40, 145, 1, 170);
  strokeWeight(0);
  stroke(204,204,255);
  fill(204,204,255);
  rect(30,200,99,99);
  stroke(0,51,0);
  fill(0,51,0);
  rect(180,10,300,190);
  stroke("blue");
  fill(0,0,random(255));
  ellipse(260, 100, 70,70);
  fill(255);
  text("25%", 263, 113);
  fill(random(255),0,0);
  arc(260, 100, 70, 70, PI, TWO_PI);
  fill(255);
  text("37.5%", 263, 100);
  fill("yellow");
  arc(260, 100, 70, 70, PI, PI+QUARTER_PI);
  fill("black");
  text("12.5%", 225, 100);
  fill(0,random(255),0);
  arc(260,100, 70, 70, HALF_PI, PI);
  fill("black");
  text("25%", 237, 113);
  strokeWeight(4);
  stroke(224,224,224);
  line(160,170,mouseX,90);
  strokeWeight(0);
}

function dibujaPoligono(x,y,radio,lados){
	var angulo = (2*PI)/lados;
	var alto1;
	var alto2;
	var ancho1;
	var ancho2;
	for (var i = 0; i < lados; i++) {
		alto1= radio*Math.cos(angulo*i);
		ancho1= radio*Math.sin(angulo*i);
		alto2= radio*Math.cos(angulo*(i+1));
		ancho2= radio*Math.sin(angulo*(i+1));
		line(x+ancho1,y+alto1,x+ancho2,y+alto2);
	}
}
/*Función que se ejecuta cuando el tamaño de la pantalla cambia(para que el canvas sea responsivo)*/
function windowResized() {

	var state = Reveal.getState();
	if(state.indexh == 0 && state.indexv == 0){
		resizeCanvas(windowWidth, windowHeight);
	}else{
		resizeCanvas(windowWidth*0.7, windowHeight*0.8);
	}
  	mitadX=width/2;
  	mitadY=height/2;
}