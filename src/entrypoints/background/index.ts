export default defineBackground(() => {

  // action button
  // browser.action.onClicked.addListener((tab)=>{
  //   console.log("Action button clicked!")
  //   fetch(``, {
  //           method: "GET",
            
  //           // headers: {
  //           //     "Content-Type": "application/json",
  //           // },
  //           // body: JSON.stringify({
  //           //     message: "hello from extension"
  //           // }),
  //       }).then(() => console.log("fetched"));
  // })
  browser.runtime.onMessage.addListener(handleMessages)
});


function handleMessages(data: any, sender: any, sendResponse: any) {
  if(data.type === "check"){
    // check handler
    checkHandler(data, sendResponse)

    return true
  }

  if(data.type === "vote"){
    voteHandler(data, sendResponse)
    return true
  }
}

function checkHandler(data: any, sendResponse: any){
  fetch(import.meta.env.WXT_CHECK_URL + data.id).then(response => response.json()).then((data)=>{
    console.log(data)
    sendResponse({
      isSlop: data.isSlop
    })
  })
}

function voteHandler(data: any, sendResponse: any){
  console.log(data)
}