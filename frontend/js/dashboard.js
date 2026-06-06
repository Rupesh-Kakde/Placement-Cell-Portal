const BASE_URL = "http://localhost:5000/api";

async function loadDashboardStats() {

    const token =
    localStorage.getItem("token");

    try {

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

        const applications =
        await applicationsResponse.json();

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
        applications.count || 0;

    }
    catch(error){

        console.log(error);

    }

}

loadDashboardStats();