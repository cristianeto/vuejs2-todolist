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
var dataBase = firebase.database(),
//autenticacion
 auth=firebase.auth(),
//proveedor
 provider = new firebase.auth.GoogleAuthProvider();
Vue.component('todo-list',{
    template:'#todo-template',
    data:function(){
        return{
            nuevaTarea:null,
            editandoTarea:null,
        }
    },
    props:['tareas','autentificado', 'usuarioActivo'],
    methods:{
        agregarTarea:function(tarea){
            dataBase.ref('tareas/').push({
                titulo: tarea,
                completado: false,
                nombre: vm.usuarioActivo.displayName,
                avatar: vm.usuarioActivo.photoURL,
                uid: vm.usuarioActivo.uid

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
        //DATAbase
        dataBase.ref('tareas/').on('value', function(snapshot){
           //console.log(snapshot.val());
            vm.tareas=snapshot.val();
            vm.tareas=[];
            var objeto = snapshot.val();
            for(var propiedad in objeto){
                vm.tareas.unshift({
                    '.key': propiedad,
                    completado: objeto[propiedad].completado,
                    titulo: objeto[propiedad].titulo,
                    avatar: objeto[propiedad].avatar,
                    nombre: objeto[propiedad].nombre,
                    uid: objeto[propiedad].uid
                });
            }
        });
        //Auth
        auth.onAuthStateChanged(function(user) {
            if (user) {
                console.info('Conectado: '+user);
                vm.autentificado=true;
                vm.usuarioActivo=user;
            } else {
                // No user is signed in.
                console.warn('No Conectado');
                vm.autentificado=false;
                vm.usuarioActivo=null;
            }
        });
    },
    data:{
        tema: 'Vuejs & Firebase',
        tareas:[],
        autentificado:false,
        usuarioActivo:null,
    },
    methods:{
        conectar:function(){
            firebase.auth().signInWithPopup(provider).catch(function(result) {
               console.error('Error haciendo login: ', error);
            });
        },
        desconectar:function(){
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.info('Usuario desconectado exitosamente')
            }, function(error) {
                // An error happened.
                console.error('Error haciendo log-out ',error)
            });
        }
    }

});