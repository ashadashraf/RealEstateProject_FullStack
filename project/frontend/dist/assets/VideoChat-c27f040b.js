import{j as n}from"./react-5e5497d9.js";import{z as t}from"./@zegocloud-df1323c4.js";import{u as p,b as m}from"./react-router-c0ec2a24.js";import"./@babel-11e817af.js";import"./prop-types-9bfe13df.js";import"./history-14403fb6.js";import"./resolve-pathname-e210f2ac.js";import"./value-equal-17d7769a.js";import"./tiny-invariant-253458cb.js";import"./path-to-regexp-00f975c1.js";import"./isarray-7a86238f.js";import"./hoist-non-react-statics-d5fd62bb.js";const j=()=>{const o=p(),{roomID:e}=m();let r=async i=>{const s="5694d9aec9e2cc2006c87031d717f8c4",a=t.ZegoUIKitPrebuilt.generateKitTokenForTest(602805633,s,e,Date.now().toString(),"Rykerz");t.ZegoUIKitPrebuilt.create(a).joinRoom({container:i,sharedLinks:[{name:"Copy link",url:`https://rykerzrealestates.netlify.app/room/${e}`}],scenario:{mode:t.ZegoUIKitPrebuilt.OneONoneCall},showScreenSharingButton:!1,onLeaveRoom:()=>o.push("/userpropertydetail")})};return n.jsx("div",{className:"VideoChat",ref:r})};export{j as default};
