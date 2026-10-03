const jobs=new Map();
export function createJob({targetUrl,action,count}){const job={id:crypto.randomUUID(),targetUrl,action,count,status:"queued",createdAt:new Date().toISOString(),startedAt:null,completedAt:null,result:null};jobs.set(job.id,job);return job}
export function listJobs(){return [...jobs.values()]}
export function getJob(id){return jobs.get(id)||null}
export function updateJob(id,patch){const job=jobs.get(id);if(!job)return null;const updated={...job,...patch};jobs.set(id,updated);return updated}
