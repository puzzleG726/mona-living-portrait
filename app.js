import { createAvatar } from './avatar.js';
import { exhibits, scriptReply } from './content.js';
const $=id=>document.getElementById(id);
const avatar=createAvatar($('avatarCanvas'),text=>{$('avatarState').textContent=text;});
let selected='identity';
const messages=[];
function notice(text){$('notice').textContent=text;}
function addMessage(role,text){
 const node=document.createElement('article');node.className=`message ${role}`;
 const by=document.createElement('div');by.className='message-author';
 const dot=document.createElement('span');dot.className='chat-dot';by.append(dot,role==='user'?'YOU':'LISA');
 const p=document.createElement('p');p.textContent=text;node.append(by,p);$('chat').append(node);$('chat').scrollTop=$('chat').scrollHeight;
 messages.push({role,content:text});
}
function welcome(){addMessage('assistant','你好，你可以叫我莉萨。你想从我的身份、这个微笑，还是这幅画的旅程开始？');}
function select(id){selected=id;document.querySelectorAll('.exhibit').forEach(el=>{el.classList.toggle('active',el.dataset.id===id);el.setAttribute('aria-pressed',String(el.dataset.id===id));});const x=exhibits.find(x=>x.id===id);notice(`已选择「${x.name}」。可以输入问题，或点击下方的相关问题。`);}
for(const x of exhibits){
 const b=document.createElement('button');b.type='button';b.className='exhibit'+(x.id===selected?' active':'');b.dataset.id=x.id;b.setAttribute('aria-pressed',String(x.id===selected));
 b.innerHTML=`<span class="exhibit-art">${x.number}</span><span class="exhibit-info"><strong>${x.name}</strong><small>${x.tag}</small></span><span class="exhibit-arrow">↗</span>`;
 b.onclick=()=>select(x.id);$('exhibits').append(b);
}
function ask(text){
 text=text.trim();if(!text)return;avatar.stopSample();addMessage('user',text);$('messageInput').value='';
 const reply=scriptReply(text,selected);
 const answer=reply.text.startsWith('当前是预设讲解模式')?'这个在线展览提供预设导览。你可以问我的身份、微笑，或者这幅画的来历；完整AI自由对话与语音识别运行在本地版本。':reply.text;
 addMessage('assistant',answer);notice('预设导览文字 · 数字人口型可通过“播放 MuseTalk 样片”观看。');
}
$('chatForm').onsubmit=e=>{e.preventDefault();ask($('messageInput').value);};
$('messageInput').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();ask($('messageInput').value);}};
document.querySelectorAll('[data-prompt]').forEach(b=>b.onclick=()=>ask(b.dataset.prompt));
const preview=()=>{avatar.previewSample('./mona-musetalk-sample.mp4','MuseTalk');$('stopBtn').disabled=false;notice('正在播放预先生成的口型样片，内容不随本次问题变化。');};
$('sampleBtn').onclick=preview;$('voiceBtn').onclick=preview;
$('stopBtn').onclick=()=>{avatar.stopSample();$('stopBtn').disabled=true;$('avatarState').textContent='画作静候你的提问';notice('样片已停止。');};
$('resetBtn').onclick=()=>{avatar.stopSample();messages.length=0;$('chat').replaceChildren();welcome();notice('已重置导览对话。');};
$('settingsBtn').onclick=()=>$('settingsDialog').showModal();$('closeSettings').onclick=()=>$('settingsDialog').close();$('applySettings').onclick=()=>$('settingsDialog').close();
$('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify({project:'MONA · 画中来信',mode:'static-scripted-gallery',exportedAt:new Date().toISOString(),messages,notes:'Preset guided text and one pre-rendered MuseTalk clip; no live model inference on GitHub Pages.'},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mona-gallery-session.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
function film(value){document.body.classList.toggle('film-mode',value);$('exitFilm').hidden=!value;$('filmBtn').setAttribute('aria-pressed',String(value));}
$('filmBtn').onclick=()=>film(true);$('exitFilm').onclick=()=>film(false);document.addEventListener('keydown',e=>{if(e.key==='Escape')film(false);});
window.addEventListener('pagehide',()=>avatar.stopSample());
welcome();notice('在线展览版：预设导览与 MuseTalk 样片。自由AI对话、语音识别及逐轮口型需运行本地完整版。');
