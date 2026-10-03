const accounts=new Map();
export function listAccounts(){return [...accounts.values()]}
export function addAccount(platform="instagram"){const account={id:crypto.randomUUID(),platform,status:"ready",username:null,createdAt:new Date().toISOString()};accounts.set(account.id,account);return account}
export function removeAccount(id){return accounts.delete(id)}
