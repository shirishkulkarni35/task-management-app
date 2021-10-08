let globalStudentData = [];
studentContents=document.getElementById("studentContentsRow");

const addCard = () => {
    const newStudentDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("studentImageURL").value,
        name: document.getElementById("studentName").value,
        rollNo: document.getElementById("studentRollNo").value,
        contactNo: document.getElementById("studentContactNo").value,
        address: document.getElementById("studentAddress").value
    };

    studentContents.insertAdjacentHTML('beforeend', generateStudentCard(newStudentDetails));

    globalStudentData.push(newStudentDetails);
    saveToLocalStorage();
}
const generateStudentCard = ({id,url,name,rollNo,contactNo,address}) => {
    return(`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
      <div class="card-header">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-info" name=${id} onclick="editStudent(this)">
              <i class="fas fa-pencil-alt" name=${id} onclick="editStudent(this)"></i>
          </button>
          <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteStudent(this)">
              <i class="far fa-trash-alt" name=${id} onclick="deleteStudent(this)"></i>
          </button>
        </div>
      </div>
      <img src=${url} class="card-img-top" alt="image"/>
      <div class="card-body">
          <h5 class="card-title" id="sname">${name}</h5>
          <p class="card-text">${contactNo}</p>
          <span class="badge bg-primary">${rollNo}</span>
          <p class="card-text">${address}</p>
      </div>
      <div class="card-footer">
          <button class="btn btn-outline-primary float-end" name=${id}>OPEN STUDENT</button>
      </div>
    </div>
  </div>`)
}

const saveToLocalStorage = () => {
    localStorage.setItem("studenttasks", JSON.stringify({student: globalStudentData}));
  }

const reloadStudentCard = () => {
  const localStorageCopy=JSON.parse(localStorage.getItem("studenttasks"))
  if(localStorageCopy){
    globalStudentData=localStorageCopy["student"];
  }
  globalStudentData.map((cardData) => {
    studentContents.insertAdjacentHTML("beforeend",generateStudentCard(cardData))
  })
}

const deleteStudent = (e) => {
  const targetID = e.getAttribute("name");
  globalStudentData = globalStudentData.filter((cardData) => cardData.id!==targetID);
  console.log(globalStudentData)
  saveToLocalStorage();
  window.location.reload();
}

const editStudent = (e) => {
  console.log(e)
  console.log(e.parentNode)
  console.log(e.parentNode.parentNode.parentNode.childNodes)
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[7])

  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[7].setAttribute("contenteditable", "true")

  console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1])
  
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
  console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("name", id))
}

const saveEditTask = (e) => {
  const targetID = e.getAttribute("name");
  console.log(e)
  console.log(targetID)
  // console.log(e.parentNode)
  // console.log(e.parentNode.parentNode.parentNode.childNodes)
  var studentName=e.parentNode.parentNode.childNodes[5].childNodes[1]
  var submitButton=e.parentNode.parentNode.childNodes[7].childNodes[1];
  var studentContactNo=e.parentNode.parentNode.childNodes[5].childNodes[3]
  var studentRollNo=e.parentNode.parentNode.childNodes[5].childNodes[5]
  var studentAddress=e.parentNode.parentNode.childNodes[5].childNodes[7]
  
  const updateData = {
    studentName: studentName.innerHTML,
    studentContactNo: studentContactNo.innerHTML,
    studentRollNo: studentRollNo.innerHTML,
    studentAddress:studentAddress.innerHTML
  };
  let studentCopy = globalStudentData;
  studentCopy =studentCopy.map((card) =>
  card.id === targetID
      ? {
          id: card.id,
          name: updateData.studentName,
          rollNo: updateData.studentRollNo,
          contactNo: updateData.studentContactNo,
          address:updateData.studentAddress,
          url: card.url,
        }
      : card
  );
  globalStudentData= studentCopy;
  saveToLocalStorage();
  studentName.setAttribute("contenteditable", "false");
  studentContactNo.setAttribute("contenteditable", "false");
  studentRollNo.setAttribute("contenteditable", "false");
  studentAddress.setAttribute("contenteditable", "false");
  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "OPEN STUDENT";
  // console.log(globalStudentData);
  // localStorage.setItem("studenttasks", JSON.stringify({student: globalS
  // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
  // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])
  // you will get all the updated fields
  // then update it inside the localStorage corresponding to that card id
  // after that saveToLocalStorage
  // window.location.reload();
}


// var suppose = {id: "1631720624226", url: "egtrshs", title: "tshdj", type: "dyjdyj", description: "dyjydj"}
// suppose.description = "my name is nikhil agarwal"
