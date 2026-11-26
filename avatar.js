// The original painting is preserved; all talking frames come from a neural model.
export function createAvatar(container,onState){
 const canvas=document.createElement('canvas');canvas.width=960;canvas.height=1431;canvas.setAttribute('aria-label','蒙娜丽莎原画');container.append(canvas);
 const video=document.createElement('video');video.playsInline=true;video.controls=true;video.hidden=true;video.setAttribute('aria-label','AI 口型视频');container.append(video);
 const ctx=canvas.getContext('2d'),image=new Image();image.src='./mona-lisa.jpg';
 image.onload=()=>ctx.drawImage(image,0,0,960,1431);image.onerror=()=>onState?.('画像未能加载，请刷新重试');
 let gestureTimer;
 function stopSample(){video.pause();video.hidden=true;canvas.hidden=false;}
 function videoElement(url,label='MuseTalk 本轮回答'){
  stopSample();canvas.style.transform='';clearTimeout(gestureTimer);canvas.hidden=true;video.hidden=false;video.src=url;video.setAttribute('aria-label',label);return video;
 }
 return {canvas,videoElement,
  previewSample(url='./mona-musetalk-sample.mp4',engine='MuseTalk'){
   const element=videoElement(url,engine+' 预先生成样片');onState?.(engine+' 固定语音样片 · 非本轮回答');
   element.onended=()=>{stopSample();onState?.('画作静候你的提问');};element.onerror=()=>{stopSample();onState?.('样片加载失败，请刷新重试');};
   element.play().catch(()=>onState?.('请点击视频播放'));
  },stopSample,
  gesture(name){clearTimeout(gestureTimer);canvas.style.transform=name==='nod'?'translateY(2px) scale(1.003)':'';if(name!=='idle')gestureTimer=setTimeout(()=>{canvas.style.transform='';},1800);},
  emotion(){},speaking(){},setAudio(){},destroy(){clearTimeout(gestureTimer);stopSample();}
 };
}
