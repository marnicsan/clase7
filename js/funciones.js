/*Crear una funcion que agrege una pelicula al array de peliculas
La pelicula debera tener un ID y un Titulo
Crear una funcion que evalue antes de agregar que la pelicula no fue ingresada previamente
Crear una funcion que ordene las peliculas por Titulo y por ID
Crear una funcion que elimine una pelicula por su ID.*/

var Pelicula= function(id,titulo,descripcion,imagen){
	this.id=id;
	this.titulo=titulo;
	this.descripcion=descripcion;
	this.imagen=imagen;
}

var imdb=(function(){
	var instancia;
	
	function init(){
		var peliculas=[];
		var id=1;
		if(localStorage.getItem("peliculas")==null){
			localStorage.setItem("peliculas",JSON.stringify(peliculas));
		}else{
			var aux=localStorage.getItem("peliculas");
			peliculas=JSON.parse(aux);
		}

		function persistirPelis(){
			localStorage.setItem("peliculas",JSON.stringify(peliculas));
		}

		function ordenarPeliculasId(){
			peliculas.sort(function(a,b){
				return a.id>b.id;
			});
		}

		function ordenarPeliculasTitulo(){
			peliculas.sort(function(a,b){
				return a.titulo>b.titulo;
			});
		}

		function validarPelicula(titulo){
			var res=true;
			if(titulo!=""){
				if(peliculas.length>0){
					for(var i=0;i<peliculas.length;i++){
						if(peliculas[i].titulo==titulo){
							res=false;
							console.log("La pelicula "+titulo+"ya existe")
							break;
						}
					}
				}
			}else{
				res=false;
			}
			return res;
		}

		return{
			agregarPelicula: function(titulo,descp,img){
				if(validarPelicula(titulo)){
					peliculas.push(new Pelicula(id,titulo,descp,img))
					id++;
				}
				persistirPelis();
			},

			eliminarPelicula: function(id){
				for(var i=0;i<peliculas.length;i++){
					if(peliculas[i].id==id){
						peliculas.splice(i,1);
						break;
					}
				}
				persistirPelis();
			},

			ordenarPelis: function(tipoOrd){
				if(tipoOrd==1){
					ordenarPeliculasId();
					persistirPelis();
				}else if(tipoOrd==2){
					ordenarPeliculasTitulo();
					persistirPelis();
				}
			},

			mostrarPelis: function(){
				var pelis="";
				for(var i=0;i<peliculas.length;i++){
					pelis=pelis+"<div id='peli'"+peliculas[i].id+">"+
									"<h1>"+peliculas[i].titulo+"</h1>"+
									"<p>"+peliculas[i].descripcion+"</p>"+
									"<img src='"+peliculas[i].imagen+"' alt='imagen peli "+peliculas[i].id+"' />"+
								"</div>";
				}
				document.getElementById("pelis").innerHTML=pelis;
			}
		}
	};

	return{
		instanciar: function() {
            if (!instancia)
                instancia = new init();
            return instancia;
        }
	}

})();

function accionar(pelis){
	var accion=-1
	do{
		accion=prompt("Por favor Indique el numero de accion a realizar:\n\n"+
						"1- Agregar Pelicula\n"+
						"2- Ordenar Pelicula\n"+
						"3- Elimnar Pelicula\n"+
						"4- Mostrar Peliculas\n"+
						"5- Terminar");
		switch(accion){
			case "1": 	agregarPeliculas(pelis);
						break;
			case "2": 	ordenarPeliculas(pelis);
						break;
			case "3": 	eliminarPeliculas(pelis);
						break;
			case "4": 	pelis.mostrarPelis();
						accionar(pelis);
						break;
			case "5": 	alert("ADIOS!");
						break;
		}
	}while(accion!="1" && accion!="2" && accion!="3" && accion!="4" && accion!="5")
}

function agregarPeliculas(pelis){
	var titulo="";
	var descp="";
	var img="";
	do{
		titulo=prompt("Ingrese Titulo de la pelicula a agregar:")
	}while(titulo=="");
	do{
		descp=prompt("Ingrese Descripcion de la pelicula a agregar:")
	}while(descp=="");
	do{
		img=prompt("Ingrese referencia de imagen de la pelicula a agregar:")
	}while(img=="");
	if(img!="" && descp!="" && titulo!="")
		pelis.agregarPelicula(titulo,descp,img);
	accionar(pelis);
}

function eliminarPeliculas(pelis){
	var titulo="";
	do{
		titulo=prompt("Ingrese Id de la pelicula a eliminar:")
		pelis.eliminarPelicula(titulo);
	}while(titulo=="");
	accionar(pelis);
}

function ordenarPeliculas(pelis){
	var titulo="";
	do{
		titulo=prompt("Ingrese numero de tipo de Ordenamiento:\n\n"+
						"1- Ordenar por Id\n"+
						"2- Ordenar por Titulo\n")
		pelis.ordenarPelis(titulo);
	}while(titulo=="")
	accionar(pelis);
}

function iniciar(){
	var pelis=imdb.instanciar();
	accionar(pelis);
}