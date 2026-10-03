const jobs=new Map();
export function createJob({targetUrl,action,count}){const job={id:crypto.randomUUID(),targetUrl,action,count,status:"queued",createdAt:new Date().toISOString()};jobs.set(job.id,job);return job}
export function listJobs(){return [...jobs.values()]}
