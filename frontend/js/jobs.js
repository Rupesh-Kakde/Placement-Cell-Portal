const JOB_API_URL =
"http://localhost:5000/api/jobs";

const jobForm =
document.getElementById("jobForm");

const jobTableBody =
document.getElementById("jobTableBody");


// Load Jobs

async function loadJobs() {

    try {

        const token =
        localStorage.getItem("token");

        const response =
        await fetch(JOB_API_URL,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const result =
        await response.json();

        jobTableBody.innerHTML = "";

        result.data.forEach(job => {

            const row =
            document.createElement("tr");

            row.innerHTML = `
                <td>${job.title}</td>
                <td>${job.skills.join(", ")}</td>
                <td>${job.package} LPA</td>
                <td>${new Date(job.deadline).toLocaleDateString()}</td>
            `;

            jobTableBody.appendChild(row);

        });

    }
    catch(error){

        console.log(error);

    }

}


// Create Job

jobForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const token =
localStorage.getItem("token");

const jobData = {

title:
document.getElementById(
"jobTitle"
).value,

skills:
document.getElementById(
"jobSkills"
).value.split(","),

package:
document.getElementById(
"jobPackage"
).value,

deadline:
document.getElementById(
"jobDeadline"
).value

};

try{

await fetch(
JOB_API_URL,
{
method:"POST",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:
JSON.stringify(jobData)
}
);

jobForm.reset();

loadJobs();

}
catch(error){

console.log(error);

}

});

loadJobs();