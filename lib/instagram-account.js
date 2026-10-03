const account={id:"instagram-account-01",platform:"instagram",status:"disconnected",username:null,accountId:null,connectedAt:null,workerId:"worker-01"};
export function getInstagramAccount(){return account}
export function connectInstagramAccount({username,accountId}){account.status="connected";account.username=username||null;account.accountId=accountId||null;account.connectedAt=new Date().toISOString();return account}
export function disconnectInstagramAccount(){account.status="disconnected";account.username=null;account.accountId=null;account.connectedAt=null;return account}
