const logs=[];
export function addLog(entry){const item={id:crypto.randomUUID(),createdAt:new Date().toISOString(),...entry};logs.unshift(item);return item}
export function listLogs(){return logs.slice(0,100)}
