/**
 * Created by Cristian on 30/11/16.
 */
new Vue({
    el: '#app',
    data:{
        tema: 'Vuejs & Firebase',
        nuevaTarea:null,
        editandoTarea:null,
        tareas:[
            {titulo:'Salir a correr.', completado:false},
            {titulo:'Ir al gimnasio.', completado:false},
            {titulo:'Limpiar el coche.', completado:true},
            {titulo:'Hacer la compra.', completado:false},
            {titulo:'Aprender Vuejs & Firebase', completado:false}
        ]
    },
    methods:{
        agregarTarea:function(tarea){
            //console.info(tarea);
            this.tareas.unshift({
                titulo:tarea,
                completado:false
            });
        },
        editarTarea:function(tarea){
            console.info(tarea);
        },
        eliminarTarea: function(indice){
            this.tareas.splice(indice,1); //eliminar el elemento de ese indice
        }
    }
});