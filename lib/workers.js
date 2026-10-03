const workers=new Map();
export function listWorkers(){return [...workers.values()]}
export function createWorker(platform="instagram"){const worker={id:crypto.randomUUID(),platform,status:"idle",currentJobId:null,createdAt:new Date().toISOString()};workers.set(worker.id,worker);return worker}
export function updateWorker(id,patch){const worker=workers.get(id);if(!worker)return null;const updated={...worker,...patch};workers.set(id,updated);return updated}
