/**
 * Created by Cristian on 30/11/16.
 */
Vue.component('todo-list',{
    template:'#todo-template',
    data:function(){
        return{
            nuevaTarea:null,
            editandoTarea:null,
        }
    },
    props:['tareas'],
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

new Vue({
    el: '#app',
    data:{
        tema: 'Vuejs & Firebase',

        tareas:[
            {titulo:'Salir a correr.', completado:false},
            {titulo:'Ir al gimnasio.', completado:false},
            {titulo:'Limpiar el coche.', completado:true},
            {titulo:'Hacer la compra.', completado:false},
            {titulo:'Aprender Vuejs & Firebase', completado:false}
        ]
    },

});