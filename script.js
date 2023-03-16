const addPjtBtn = document.querySelector("#add-pjt-btn");
const addPjtFormContainer = document.querySelector("#add-pjt-form-container");
const addPrjFormCxlBtn = document.querySelector("#pjt-form-cancel");
const addPrjFormAddBtn = document.querySelector("#pjt-form-add");
const addPjtValidationBlock = document.querySelector("#add-pjt-vd");
const addPjtInput = document.getElementById("pjt-name");
const projectsOverview = document.querySelector(".projects-overview")


let addPjtInputValid = false;

addPjtBtn.addEventListener("click", () => {
    addPjtFormContainer.style.display = "flex";
});


addPrjFormCxlBtn.addEventListener("click", () =>{
    addPjtFormContainer.style.display = "none";
} );

addPrjFormAddBtn.addEventListener("click", () =>{
    
   
    if(addPjtInputValid){
        let pjtDiv = document.createElement("div");
        pjtDiv.className = "project-name";
        pjtDiv.innerHTML = addPjtInput.value;
        projectsOverview.appendChild(pjtDiv);
        addPjtFormContainer.style.display = "none";
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
        addPjtInputValid = true;
        addPjtValidationBlock.classList.add("valid")
        addPjtValidationBlock.innerHTML = "Valid"
    }else{
        addPjtInputValid = false;
        addPjtValidationBlock.classList.remove("valid")
        addPjtValidationBlock.innerHTML = "Too long"
    }
   
})



