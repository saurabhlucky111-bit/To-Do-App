let input = document.querySelector("input");
let btn = document.querySelector("button");
let container = document.querySelector("#container");
let totalTask = document.querySelector("#total-task");
let compTask = document.querySelector("#comp-task");
let pendTask= document.querySelector("#rem-task");


let totalCount = 0;
let compCount = 0;
let remCount = 0;

function updateTotal(){ 
    totalTask.textContent = `Total-task : ${totalCount}`;
    };

function updateCompleted(){ 
    compTask.textContent = `Completed : ${compCount}`;
    };

function updatePending(){ 
    remCount = totalCount - compCount;
    pendTask.textContent =`Pending : ${remCount}`;
    };

function updateUI(){
    updateTotal();
    updateCompleted();
    updatePending();
};

btn.addEventListener("click",function(){

    let newTask = input.value.trim();

    if(!newTask ) return;

    let task = document.createElement("div");
    let para = document.createElement("p");
    let deleteBtn = document.createElement("button");

    task.classList.add("task");
    deleteBtn.classList.add("delete-btn");

        para.textContent = newTask;
        deleteBtn.textContent = "❌";
          

        task.appendChild(para);
        task.appendChild(deleteBtn)
        container.appendChild(task);
        totalCount++;
        
        updateUI();

        input.value = "";

deleteBtn.addEventListener("click",function(){
    
        task.remove();
        totalCount--;
        if(task.classList.contains("completed")){
            compCount--
        
        };
    
        updateUI();

});
    
    para.addEventListener("click",function(){
    task.classList.toggle("completed");

    if(task.classList.contains("completed")){
        deleteBtn.style.backgroundColor = "blue";
        para.style.color ="brown";
        compCount++;
        updateCompleted();
        updatePending();
    }
    else{
        deleteBtn.style.backgroundColor = "red";
        para.style.color ="black"
        compCount--;
        
        updateUI();

    };
});
    
});
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        btn.click();       
}
});
updateUI();

