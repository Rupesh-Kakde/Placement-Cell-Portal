const COMPANY_API_URL =
"https://placement-cell-portal-dkwr.onrender.com/api/companies";

const companyForm =
document.getElementById("companyForm");

const companyTableBody =
document.getElementById("companyTableBody");


// Load Companies

async function loadCompanies() {

    try {

        const token =
        localStorage.getItem("token");

        const response =
        await fetch(COMPANY_API_URL,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const result =
        await response.json();

        companyTableBody.innerHTML = "";

        result.data.forEach(company => {

            const row =
            document.createElement("tr");

            row.innerHTML = `
                <td>${company.companyName}</td>
                <td>${company.website}</td>
                <td>${company.sector}</td>
                <td>${company.contactEmail}</td>
            `;

            companyTableBody.appendChild(row);

        });

    }
    catch(error){

        console.log(error);

    }

}


// Save Company

companyForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const token =
localStorage.getItem("token");

const companyData = {

companyName:
document.getElementById(
"companyName"
).value,

website:
document.getElementById(
"companyWebsite"
).value,

sector:
document.getElementById(
"companySector"
).value,

contactEmail:
document.getElementById(
"companyEmail"
).value

};

try{

await fetch(
COMPANY_API_URL,
{
method:"POST",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:
JSON.stringify(companyData)
}
);

companyForm.reset();

loadCompanies();

}
catch(error){

console.log(error);

}

});

loadCompanies();