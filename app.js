let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let msgContainer= document.querySelector(".msg-container");

let turnO= true;
let count=0;

const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resetGame=()=>{
    turnO=true;
    enableBtn();
    count=0;
    msgContainer.classList.remove("show");

};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("box was clicked!");
        if(turnO){
            box.innerHTML="<img src='leo.jpeg' alt='leo'>";
            box.value = "O";
            turnO=false;
        }
        else{
            box.innerHTML="<img src='coco.jpeg' alt='coco'>";
            box.value= "X";
            turnO=true;
        }
        count+=1;
        box.disabled=true;//to mark box unchangeable
        if(count==9){
            draw();
        }
        checkWinner();
    });
});

const disableBtn=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBtn=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerHTML="";
        box.value="";
    }
};

const showWinner=(winner)=>{
    msgContainer.innerText= winner+" WON";
    msgContainer.classList.add("show");

};

const draw=()=>{
    msgContainer.innerText="Draw! Try Again.";
    msgContainer.classList.add("show");
}

const checkWinner=()=>{
    for(pattern of winPattern){
        let pos1Val= boxes[pattern[0]].value;
        let pos2Val= boxes[pattern[1]].value;
        let pos3Val= boxes[pattern[2]].value;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                // console.log("Winner",pos1Val);
                disableBtn();
                showWinner(pos1Val==="O"?"Leo":"Coco");
            }
        }
    }
};

resetBtn.addEventListener("click",resetGame);

