/**
 * Created by Cristian on 30/11/16.
 */
/*FIrebase*/
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBhP1DZT7_hgfisz6zAGICp6Puh7FGESaE",
    authDomain: "vuejs2todolist.firebaseapp.com",
    databaseURL: "https://vuejs2todolist.firebaseio.com",
    storageBucket: "vuejs2todolist.appspot.com",
    messagingSenderId: "400410754704"
};
firebase.initializeApp(config);
/*Fin fireBase*/

/*Usando real Database*/
// Get a reference to the database service
var dataBase = firebase.database();

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
            dataBase.ref('tareas/').push({
                titulo: tarea, completado: false,
            });
            this.nuevaTarea='';
        },
        editarTarea:function(tarea){
            //console.info(tarea['.key']);
            dataBase.ref('tareas/'+tarea['.key']).update({
               titulo: tarea.titulo
            });
        },
        actualizarEstadoTarea:function(estado, tarea){
            dataBase.ref('tareas/'+tarea['.key']).update({
                completado: estado?true:false,
            });
        },
        eliminarTarea: function(tarea){
            //this.tareas.splice(indice,1); //eliminar el elemento de ese indice
            dataBase.ref('tareas/'+tarea['.key']).remove();

        }

    }
});

var vm=new Vue({
    el: '#app',
    mounted: function(){
        dataBase.ref('tareas/').on('value', function(snapshot){
           //console.log(snapshot.val());
            vm.tareas=snapshot.val();
            vm.tareas=[];
            var objeto = snapshot.val();
            for(var propiedad in objeto){
                vm.tareas.unshift({
                    '.key': propiedad,
                    completado: objeto[propiedad].completado,
                    titulo: objeto[propiedad].titulo
                });
            }
        });
    },
    data:{
        tema: 'Vuejs & Firebase',
        tareas:[]
    },

});