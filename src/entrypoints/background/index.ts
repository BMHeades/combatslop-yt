import { v4 as uuid } from 'uuid';

export default defineBackground(() => {


  // action button
  // browser.action.onClicked.addListener((tab) => {
  //   console.log("Action button clicked!")
  //   fetch(import.meta.env.WXT_VIDEOS_URL + "12345678901", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       isSlop: true,
  //       voterId: 'a28ba58e-3804-4b58-96ca-4fc1c06b0ea7'
  //     }),
  //   }).then(() => console.log("voted"));
  // })


  browser.runtime.onMessage.addListener(handleMessages)
});


function handleMessages(data: any, sender: any, sendResponse: any) {
  if (data.type === "check") {
    // check handler
    checkHandler(data, sendResponse)

    return true
  }

  if (data.type === "batchCheck") {
    // check handler
    batchCheckHandler(data, sendResponse)

    return true
  }

  if (data.type === "vote") {
    voteHandler(data, sendResponse)
    return true
  }
}

const batchVideos = []
const videos = new Map<any, any>()

function batchCheckHandler(data: any, sendResponse: any) {
  batchVideos.push(data.id)
  if (batchVideos.length > 1) {
    fetch(import.meta.env.WXT_VIDEOS_URL + "batch").then(response => response.json()).then((data) => {
      console.log(data)
      sendResponse({
        isSlop: data.isSlop
      })
    }).catch(e => console.log(e))
    fetch
  }
}

function checkHandler(data: any, sendResponse: any) {
  fetch(import.meta.env.WXT_VIDEOS_URL + data.id).then(response => response.json()).then((data) => {
    console.log(data)
    sendResponse({
      isSlop: data.isSlop
    })
  }).catch(e => console.log(e))
}

async function voteHandler(data: any, sendResponse: any) {

  let clientId = await storage.getItem('sync:client_id');
  if (!clientId) {
    console.log("new client id set")
    clientId = uuid()
    await storage.setItem('sync:client_id', clientId)
  }


  await fetch(import.meta.env.WXT_VIDEOS_URL + data.id, {
    method: "POST",
    body: JSON.stringify({
      isSlop: data.isSlop,
      voterId: clientId
    }),
  })

  await storage.setItem(`local:${data.id}`, data.isSlop)
  console.log("voted")
}