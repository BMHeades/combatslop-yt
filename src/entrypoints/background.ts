export default defineBackground(() => {
  // console.log('Hello background!', { id: browser.runtime.id });


  // action button
  // browser.action.onClicked.addListener((tab)=>{
  //   console.log("Action button clicked!")
  //   if(tab?.id){

  //     browser.tabs.sendMessage(tab.id, {
  //       txt: "hello"
  //     }).then((stuff)=>console.log(stuff))
  //   }
  // })



  browser.runtime.onMessage.addListener(handleMessages)
});


function fulfill(){
  return new Promise((fulfil) => setTimeout(fulfil, 1000));
}

function handleMessages(data: any, sender: any, sendResponse: any) {
    console.log(data.message)
    fulfill().then(()=> sendResponse({
      message: "1 second passed"
    }))
    return true
}