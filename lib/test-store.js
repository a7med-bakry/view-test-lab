const tests=new Map();
const events=new Map();
export function createTest(targetUrl,eventType,count){const id=crypto.randomUUID();tests.set(id,{id,targetUrl,eventType,count,createdAt:new Date().toISOString()});events.set(id,[]);return tests.get(id)}
export function addEvent(id){const list=events.get(id);const test=tests.get(id);if(!test||!list)return {ok:false,error:"TEST_NOT_FOUND"};if(list.length>=20)return {ok:false,error:"LIMIT_REACHED"};const event={id:crypto.randomUUID(),testId:id,sequence:list.length+1,type:test.eventType,createdAt:new Date().toISOString()};list.push(event);return {ok:true,event}}
export function getTest(id){const test=tests.get(id);if(!test)return null;return {...test,events:events.get(id)||[]}}
