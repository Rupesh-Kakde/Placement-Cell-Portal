
const STUDENT_API_URL = "https://placement-cell-portal-dkwr.onrender.com/api/students";

const studentForm =
document.getElementById("studentForm");

const studentTableBody =
document.getElementById("studentTableBody");
const RECOMMENDATION_API_URL =
"https://placement-cell-portal-dkwr.onrender.com/api/recommendations";

const recommendationContainer =
document.getElementById(
"recommendationContainer"
);

async function loadRecommendations(studentId) {

    try {

        const response =
        await fetch(
        `${RECOMMENDATION_API_URL}/${studentId}`
        );

        const result =
        await response.json();

        recommendationContainer.innerHTML = "";

        if (
            !result.recommendations ||
            result.recommendations.length === 0
        ) {

            recommendationContainer.innerHTML =
            "<p>No recommended jobs found</p>";

            return;
        }

        result.recommendations.forEach(job => {

            const card =
            document.createElement("div");

            card.innerHTML = `
                <h3>${job.jobTitle}</h3>
                <p><strong>Match Score:</strong> ${job.score}%</p>
                <p><strong>Matched Skills:</strong>
                ${job.matchedSkills.join(", ")}</p>
                <hr>
            `;

            recommendationContainer.appendChild(card);

        });

    } catch (error) {

        console.log(error);

    }

}

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

    <td>
        <button
        onclick="loadRecommendations('${student._id}')">
        View Recommendations
        </button>
    </td>
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