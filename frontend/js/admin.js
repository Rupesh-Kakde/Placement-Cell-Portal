const BASE_URL = "https://placement-cell-portal-dkwr.onrender.com/api";

async function loadAdminAnalytics() {

    try {

        const token =
        localStorage.getItem("token");

        // Fetch All Data

        const studentsResponse =
        await fetch(
            `${BASE_URL}/students`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const companiesResponse =
        await fetch(
            `${BASE_URL}/companies`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const jobsResponse =
        await fetch(
            `${BASE_URL}/jobs`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const applicationsResponse =
        await fetch(
            `${BASE_URL}/applications`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const students =
        await studentsResponse.json();

        const companies =
        await companiesResponse.json();

        const jobs =
        await jobsResponse.json();

        const applicationsResult =
        await applicationsResponse.json();

        const applications =
        applicationsResult.data;
        
        console.log("APPLICATIONS DATA:", applications);

        // Top Cards

        document.getElementById(
            "studentCount"
        ).innerText =
        students.count || 0;

        document.getElementById(
            "companyCount"
        ).innerText =
        companies.count || 0;

        document.getElementById(
            "jobCount"
        ).innerText =
        jobs.count || 0;

        document.getElementById(
            "applicationCount"
        ).innerText =
        applications.length || 0;

        // Status Counts

        const selectedCount =
        applications.filter(
            app => app.status === "Selected"
        ).length;

        const shortlistedCount =
        applications.filter(
            app => app.status === "Shortlisted"
        ).length;

        const pendingCount =
        applications.filter(
            app => app.status === "Applied"
        ).length;

        const rejectedCount =
        applications.filter(
            app => app.status === "Rejected"
        ).length;

        document.getElementById(
            "selectedCount"
        ).innerText =
        selectedCount;

        document.getElementById(
            "shortlistCount"
        ).innerText =
        shortlistedCount;

        document.getElementById(
            "pendingCount"
        ).innerText =
        pendingCount;

        document.getElementById(
            "rejectedCount"
        ).innerText =
        rejectedCount;

        // Recent Activity Table

        const activityTableBody =
        document.getElementById(
            "activityTableBody"
        );

        activityTableBody.innerHTML = "";

        applications.forEach(app => {

            let statusClass =
            "pending";

            if(app.status === "Selected")
            statusClass = "selected";

            if(app.status === "Shortlisted")
            statusClass = "shortlist";

            if(app.status === "Rejected")
            statusClass = "rejected";

            activityTableBody.innerHTML += `
<tr>
    <td>
    ${app.studentId?.name || "N/A"}
    </td>

    <td>
    ${app.jobId?.companyId?.companyName || "N/A"}
    </td>

    <td>
    ${app.jobId?.title || "N/A"}
    </td>

    <td>
    <span class="status ${statusClass}">
    ${app.status}
    </span>
    </td>
</tr>
`;

        });

    }
    catch(error){

        console.log(error);

    }

}

loadAdminAnalytics();