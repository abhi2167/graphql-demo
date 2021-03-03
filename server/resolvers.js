const db = require('./db');

const Query = {
    greeting: () => 'Hello World!!', 
    jobs: () => db.jobs.list(),
    job: (root, args) => db.jobs.get(args.id),
    company: (root, args) => db.companies.get(args.id)
};

const Mutation = {
    createJob: (root, {createJobRequest}, context) => {
        if(!context.user) {
            throw new Error('Unauthorized user');
        }
        const jobId = db.jobs.create({...createJobRequest, companyId: context.user.companyId});
        return db.jobs.get(jobId);
    }
};

const Job = {
    company: (job) => db.companies.get(job.companyId)
}

const Company = {
    jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
}

module.exports = {Mutation, Query, Job, Company};