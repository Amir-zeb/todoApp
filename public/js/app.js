// function getFirebaseDatabase(){
//     firebase.database().ref('data-set').once("value",function(data){
//         console.log(data.val())
//     })
// }
const database=firebase.database();
var list=document.getElementById("list")
function getData(){
    list.innerHTML = ""
    var data_set = database.ref('data-set');
    data_set.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        childData = childSnapshot.val();
        // create li tag with text node
        var li = document.createElement('li')
        var liText = document.createTextNode(childData.todo)
        li.appendChild(liText)
        li.setAttribute("key",childData.key)
    
        // create delete button
        // var delBtn = document.createElement("button")
        // var delText = document.createTextNode("DELETE")
        // delBtn.setAttribute("class", "li-btn")
        // delBtn.setAttribute("onclick", "deleteItem(this)")
        // delBtn.appendChild(delText)
        var delBtn=document.createElement("a");
        delBtn.setAttribute("class","fa fa-trash-o li-btn")
        delBtn.setAttribute("onclick","deleteItem(this)")

        // create edit button
        // var editBtn = document.createElement("button");
        // var editText = document.createTextNode("EDIT")
        // editBtn.setAttribute("class","li-btn")
        // editBtn.appendChild(editText)
        // editBtn.setAttribute("onclick", "editItem(this)")

        var editBtn=document.createElement("a");
        editBtn.setAttribute("class","fa fa-pencil-square-o li-btn")
        editBtn.setAttribute("onclick","editItem(this)")

        li.appendChild(delBtn)
        li.appendChild(editBtn)
    
        list.appendChild(li)
    
        });
    });
}

function addTodo() {
    var todo_item = document.getElementById("todo-item");
    if(todo_item.value==""){
        alert("TextBox is Empty");
    }else{
    //save data in firebase
    var firebasekey=database.ref('data-set').push().key
    var todoData={
        todo: todo_item.value,
        key: firebasekey 
    }
    
    database.ref('data-set/' + firebasekey).set(todoData)

    todo_item.value = ""}
}

function deleteItem(e) {
    let id=e.parentNode.getAttribute("key")
    database.ref('data-set/'+id).remove();
    // console.log(e.parentNode.getAttribute("key"))
    e.parentNode.remove()
}

function editItem(e) {
    let id=e.parentNode.getAttribute("key")
    let val = prompt("Enter updated value",e.parentNode.firstChild.nodeValue)
    database.ref("data-set/"+id).update({"todo":val})
}

function deleteAll() {
    database.ref('data-set').remove();
}

getData();