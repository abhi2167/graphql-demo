const {getAccessToken, isLoggedIn} = require('./auth');
const endpointURL = 'http://localhost:9000/graphql';
async function getJobs() {
    const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
                jobs {
                  id
                  title
                  company {
                    id
                    name
                  }
                }
              }
            `
        })
    });
    const resBody = await response.json();
    return resBody.data.jobs;
}

async function fetchJobById(id) {
    const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query JobQuery($id: ID!) {
                    job(id: $id) {
                        id
                        title
                        company {
                            id
                            name
                        }
                        description
                    }
                }
            `,
            variables: {id}
        })
    });
    const respBody = await response.json();
    return respBody.data.job
}

async function fetchCompanyById(id) {
    const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query CompanyDetail($id: ID!) {
                    company(id: $id) {
                        id
                        name
                        description
                    }
                }
            `,
            variables: {id}
        })
    });
    const respBody = await response.json();
    return respBody.data.company
}

async function createJob(createJobRequest) {
    const headers = {
        'content-type': 'application/json'
    };
    if(isLoggedIn()) {
        headers['Authorization'] = 'Bearer ' + getAccessToken();
    }
    const response = await fetch(endpointURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            query: `mutation CreateJob($createJobRequest: CreateJobInput){
                job: createJob(createJobRequest: $createJobRequest) {
                    id
                    title
                    description
                    company {
                        id
                        name
                    }
                }
              }
            `,
            variables: {createJobRequest}
        })
    });
    const resBody = await response.json();
    return resBody.data.job;
}

module.exports = {
    getJobs,
    fetchJobById,
    fetchCompanyById,
    createJob
}