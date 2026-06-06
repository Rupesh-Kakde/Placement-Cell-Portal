const APPLICATION_API_URL =
"http://localhost:5000/api/applications";

const applicationForm =
document.getElementById(
"applicationForm"
);

const applicationTableBody =
document.getElementById(
"applicationTableBody"
);


// Load Applications

async function loadApplications(){

try{

const token =
localStorage.getItem("token");

const response =
await fetch(
APPLICATION_API_URL,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

const result =
await response.json();

applicationTableBody.innerHTML = "";

result.data.forEach(app=>{

const row =
document.createElement("tr");

row.innerHTML = `
<td>${app.studentId}</td>
<td>${app.jobId}</td>
<td>
<span class="status pending">
${app.status}
</span>
</td>
`;

applicationTableBody.appendChild(row);

});

}
catch(error){

console.log(error);

}

}


// Create Application

applicationForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const token =
localStorage.getItem("token");

const applicationData = {

studentId:
document.getElementById(
"studentId"
).value,

jobId:
document.getElementById(
"jobId"
).value,

status:
document.getElementById(
"applicationStatus"
).value

};

try{

await fetch(
APPLICATION_API_URL,
{
method:"POST",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:
JSON.stringify(
applicationData
)
}
);

applicationForm.reset();

loadApplications();

}
catch(error){

console.log(error);

}

});

loadApplications();