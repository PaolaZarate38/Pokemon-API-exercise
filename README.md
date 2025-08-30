# Pokemon-API-exercise
Tarea para practicar el consumo de una api mediante fetch y multiples peticiones asíncronas con promiseAll
(no se si este es el README que habia que agregar)

el proyecto se compone de tres archivos: 
poke-API.html que contiene la estrcutura basica: un div que sirve de selector en donde se iran cargando los pokemones por 'tipo', 
un conetnedor (div) con display grid en donde se iran vaciando las tarjetas creadas y finalmente un espacion div que sirve como el 
esqueleto vacio para cada tarjeta que se ira creando desde el archivo js

poke-API.js que contiene 4 metodos asincronos (manejados con asyc/await para eviar el uso de callbacks y mantener la anidacion al minimo): 

jsonContent que es un metodo reutilizable para consumir los datos de la api mediante fetch y asi hacer mas simple la estrcutura interna
de los demas metodos. 

loadTypes que carga los tipos desde la api una sola vez llamando al metodo anterior. Los resultados son guardados en la variable 'types'
y mediante un bucle for of, se extrae cada tipo individual, el bucle va creando cada elemento option y va rellenandosu contenido y valor 
con el nombre de cada tipo individual y finalmente los agrega como hijos directos del elemento select (#pokemon-type) 
Asi se crean las opciones del menu

changeType que registra el evento de cambio y eleccion de cada opction de tipo. Se vuelve a consumir la api esta vez agregando el tipo 
ala url para ir descargando la de pokemones contenidos ahi. (Eso sucede hasta la liena donde se encuentra la variable data las lienas 
siguientes fueron agregadas despues de haber escrito el metodo create card). A portir de data vi que podia hacer un nuevo arreglo unicamente 
con las url de cada pokemon con un map y despues reutilizando el metodo jsonContent bajar el conenido de cada uno (con las imagenes y nombre de 
cada pokemon) y con promise.all se elimininaba la necesidad hacer multiples requests individualmente. Pero no se como limitar el numero de pokemones 
qe se cargan a la vez, entiendo que la api carga 20 pero si fueran muchos y tuviera que limitar eso no se como hacerlo

finalmente, createCards que crea un nuevo fragmaneto con el contenido de cada tajeta (la imagen = front_default dentro del objeto sprites)
la llamada asincrona de este metodo sucede en el anterior

tambien hay un archivo css con estilos basicos
