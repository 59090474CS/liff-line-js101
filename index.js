// Import stylesheets
import "./style.css";
// SDK

//body
const body = document.getElementById("body");
//profile
const pictureUrl = document.getElementById("pictureUrl");
const userId = document.getElementById("userId");
const displayName = document.getElementById("displayName");
const statusMessag = document.getElementById("statusMessag");
const email = document.getElementById("email");
//button
const btnShare = document.getElementById("btnShare");
// Initialize LIFF app
async function main() {
  liff.ready.then(() => {
    if (liff.getOS() === "android") {
      body.style.backgroundColor = "#9bc5c3";
    }
    if (liff.isInClient()) {
      getUserProfile();
    }
  });
  await liff.init({ liffId: "1654926404-vQ0MNydz" });
}
main();

//Profile
async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = "<b>userId:</b> " + profile.userId;
  statusMessage.innerHTML = "<b>statusMessage:</b> " + profile.statusMessage;
  displayName.innerHTML = "<b>displayName:</b> " + profile.displayName;
  email.innerHTML = "<b>email:</b> " + liff.getDecodedIDToken().email;
}
//shareMsg
async function shareMsg() {
  const result = await liff.shareTargetPicker([
    {
      type: "text",
      text: "this Msg was shareMsg"
    }
  ])
   if(result){
      alert("Msg was shared!")
    } else{
      alert("shareTargetPicker was cancelled by user")
    }
    liff.closeWindpw()  
}
// add event  shared button
btnShare.onclick = () => {
  shareMsg()
}

//QR Code Reader สำหรับ Android
async function scanCode() {
  const result = await liff.scanCode()
  code.innerHTML = "<b>Code: </b>" + result.value
}
//สร้าง listener ให้กับปุ่ม Scan Code
btnScanCode.onclick = () => {
  scanCode()
}
//แสดงปุ่ม Scan Code ต่อเมื่อเปิด LIFF app ใน LINE(สมาร์ทโฟน) และ OS เป็น Android โดยให้เอาโค้ดชุดนี้ไปวางไว้ด้านล่างสุดของฟังก์ชัน main()
if (liff.isInClient() && liff.getOS() === "android") {
  btnScanCode.style.display = "block"
}
//
btnLogIn.onclick = () => {
  liff.login()
}

btnLogOut.onclick = () => {
  liff.logout()
  window.location.reload()
}
