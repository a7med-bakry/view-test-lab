const worker={id:"worker-01",platform:"instagram",status:"idle",currentJobId:null,createdAt:new Date().toISOString(),lastHeartbeat:null,completedJobs:0};
export function listWorkers(){return [worker]}
export function getWorker(){return worker}
export function createWorker(){return worker}
export function updateWorker(id,patch){if(id!==worker.id)return null;Object.assign(worker,patch);return worker}
export function heartbeat(){worker.lastHeartbeat=new Date().toISOString();if(worker.status==="offline")worker.status="idle";return worker}
