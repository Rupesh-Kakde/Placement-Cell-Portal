
const STUDENT_API_URL = "http://localhost:5000/api/students";

const studentForm =
document.getElementById("studentForm");

const studentTableBody =
document.getElementById("studentTableBody");


// Load Students

async function loadStudents() {

    try {

        const token =
        localStorage.getItem("token");

        const response =
        await fetch(STUDENT_API_URL, {
        headers: {
        Authorization: `Bearer ${token}`
     }
    });

    const result =
    await response.json();

    console.log("Students API Response:", result);

        studentTableBody.innerHTML = "";
        console.log("Student Table Body:", studentTableBody);
        console.log("Student Data:", result.data);

        result.data.forEach(student => {

    const row =
    document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.skills.join(", ")}</td>
        <td>${student.cgpa}</td>
    `;

    studentTableBody.appendChild(row);

});

console.log("Final Table HTML:", studentTableBody.innerHTML);

    } catch(error) {

        console.log(error);

    }

}



// Create Student

studentForm.addEventListener(
"submit",
async (e) => {

e.preventDefault();

const token =
localStorage.getItem("token");

const studentData = {

name:
document.getElementById(
"studentName"
).value,

email:
document.getElementById(
"studentEmail"
).value,

skills:
document.getElementById(
"studentSkills"
).value.split(","),

cgpa:
document.getElementById(
"studentCGPA"
).value,

resumeUrl:
document.getElementById(
"studentResume"
).value

};

try {

await fetch(
STUDENT_API_URL,
{
method:"POST",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:
JSON.stringify(studentData)
}
);

studentForm.reset();

loadStudents();

}
catch(error){

console.log(error);

}

});

loadStudents();