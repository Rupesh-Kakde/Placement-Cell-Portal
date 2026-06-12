const STUDENT_API_URL =
"https://placement-cell-portal-dkwr.onrender.com/api/students";
const JOB_API_URL =
"https://placement-cell-portal-dkwr.onrender.com/api/jobs";

const APPLICATION_API_URL =
"https://placement-cell-portal-dkwr.onrender.com/api/applications";

const applicationForm =
document.getElementById("applicationForm");

const applicationTableBody =
document.getElementById("applicationTableBody");


// Load Students Dropdown

async function loadStudents() {

    try {

        const token =
        localStorage.getItem("token");

        const response =
        await fetch(
            STUDENT_API_URL,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result =
        await response.json();

        const studentSelect =
        document.getElementById("studentId");

        studentSelect.innerHTML =
        '<option value="">Select Student</option>';

        result.data.forEach(student => {

            studentSelect.innerHTML += `
                <option value="${student._id}">
                    ${student.name}
                </option>
            `;

        });

    }
    catch(error){

        console.log(error);

    }

}


// Load Jobs Dropdown

async function loadJobs() {

    try {

        const token =
        localStorage.getItem("token");

        const response =
        await fetch(
            JOB_API_URL,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result =
        await response.json();

        const jobSelect =
        document.getElementById("jobId");

        jobSelect.innerHTML =
        '<option value="">Select Job</option>';

        result.data.forEach(job => {

            jobSelect.innerHTML += `
                <option value="${job._id}">
                    ${job.title}
                </option>
            `;

        });

    }
    catch(error){

        console.log(error);

    }

}


// Load Applications

async function loadApplications() {

    try {

        const token =
        localStorage.getItem("token");

        const response =
        await fetch(
            APPLICATION_API_URL,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result =
        await response.json();

        applicationTableBody.innerHTML = "";

        result.data.forEach(app => {

            const row =
            document.createElement("tr");

            row.innerHTML = `
                <td>${app.studentId?.name || "N/A"}</td>
                <td>${app.jobId?.title || "N/A"}</td>
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
async (e) => {

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

    try {

        await fetch(
            APPLICATION_API_URL,
            {
                method: "POST",

                headers: {
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


// Initial Load

loadStudents();
loadJobs();
loadApplications();