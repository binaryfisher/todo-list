const addPjtBtn = document.querySelector("#add-pjt-btn");
const addPjtFormContainer = document.querySelector("#add-pjt-form-container");
const addPrjFormCxlBtn = document.querySelector("#pjt-form-cancel");
const addPrjFormAddBtn = document.querySelector("#pjt-form-add");
const addPjtValidationBlock = document.querySelector("#add-pjt-vd");
const addPjtInput = document.getElementById("pjt-name");
const projectsOverview = document.querySelector(".projects-overview")
const displayHeaderName = document.querySelector(".display-header-name")
const cardsContainer = document.querySelector(".cards-container")
let addPjtInputValid = false;
const projects = [];
let currentProject = null;

class ToDoItem{
    constructor(title, description, dueDate){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
}

class Project{
      
    constructor(name){
      this.name = name;
      this.toDoItems = [];
    }
    addToDoItem(item){
        this.toDoItems.push(item)
    };

    removeToDoItem(item){
       const index = this.toDoItems.indexOf(item);
       this.toDoItems.splice(index, 1);
    }
    getProjectName(){
        return this.name;
    }

};

const removeAllChild = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

const updateCardDisplay = () =>{
    removeAllChild(cardsContainer);
    projects.forEach((project) =>{
        let cardDiv = document.createElement("div");
        let cardHeader = document.createElement("div")
        cardDiv.className="card";
        cardHeader.className="card-header";
        cardHeader.innerHTML = project.getProjectName();
        cardDiv.appendChild(cardHeader);
        
        cardsContainer.appendChild(cardDiv);
    })
}

addPjtBtn.addEventListener("click", () => {
    addPjtValidationBlock.innerHTML = "";
    addPjtInputValid = false;
    addPjtValidationBlock.classList.remove("valid");
    addPjtFormContainer.style.display = "flex";
});


addPrjFormCxlBtn.addEventListener("click", () =>{
    addPjtFormContainer.style.display = "none";
} );

const handlePjtClick = (event) =>{
    const pjtDivs = document.querySelectorAll(".project-name");
    pjtDivs.forEach((element) =>{
        element.classList.remove("selected");
    })
    event.target.classList.add("selected");
    projects.forEach((project) =>{
        if(project.getProjectName() == event.target.innerHTML){
            currentProject = project;
            displayHeaderName.innerHTML = project.getProjectName();
        }
    })

   
}

addPrjFormAddBtn.addEventListener("click", () =>{
    
   
    if(addPjtInputValid){
        let pjtName = addPjtInput.value;
        let project = new Project(pjtName);
        projects.push(project);
        let pjtDiv = document.createElement("div");
        pjtDiv.className = "project-name";
        pjtDiv.innerHTML = project.getProjectName();
        pjtDiv.addEventListener("click", handlePjtClick)
        projectsOverview.appendChild(pjtDiv);
        addPjtFormContainer.style.display = "none";
        updateCardDisplay();
    }else{
        addPjtValidationBlock.innerHTML = "Please enter a valid name!"
    }
    
    
});

addPjtInput.addEventListener("input", (event)=>{
    
    let inputValue = addPjtInput.value;
    if(!inputValue){
        addPjtInputValid = false;
        addPjtValidationBlock.innerHTML = "Please enter a valide name"
    }else if(inputValue.length < 3){
        addPjtInputValid = false;
        addPjtValidationBlock.classList.remove("valid");
        addPjtValidationBlock.innerHTML = "Too short";
    }else if(inputValue.length < 20){
        const pjtNames = [];
        projects.forEach((project) =>{
            pjtNames.push(project.getProjectName())
        });
        if(pjtNames.includes(inputValue.trim())){
            addPjtInputValid = false;
            addPjtValidationBlock.classList.remove("valid")
            addPjtValidationBlock.innerHTML = "Project already exist!"
        }else{
            addPjtInputValid = true;
            addPjtValidationBlock.classList.add("valid")
            addPjtValidationBlock.innerHTML = "Valid"
        }
       
    }else{
        addPjtInputValid = false;
        addPjtValidationBlock.classList.remove("valid")
        addPjtValidationBlock.innerHTML = "Too long"
    }
   
});



