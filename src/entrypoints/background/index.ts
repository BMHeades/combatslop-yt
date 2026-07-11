import { v4 as uuid } from 'uuid';
const clientIDStorage = storage.defineItem<string>('sync:client_id')

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


  clientIDStorage.getValue().then(id => {
    if (id === null) {
      clientIDStorage.setValue(uuid())
      console.log("new client id set on bg init")
    }
  })

  getConfig().then(config => {
    if(config.enabled){
      browser.runtime.onMessage.addListener(handleMessages)
    }
  })

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


function checkHandler(data: any, sendResponse: any) {
  fetch(import.meta.env.WXT_VIDEOS_URL + data.id).then(response => response.json()).then((data) => {
    console.log(data)
    sendResponse({
      isSlop: data.isSlop
    })
  }).catch(e => console.log(e))
}

async function voteHandler(data: any, sendResponse: any) {

  let clientId = await clientIDStorage.getValue()
  if (!clientId) {
    clientId = uuid()
    await clientIDStorage.setValue(clientId)
    console.log("new client id set")
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

const batchIds: string[] = []
const videos = new Map<string, Function>()

let flushing = false
let batchTimer: ReturnType<typeof setTimeout> | null = null

async function flushBatch() {
  if (flushing || batchIds.length === 0) {
    return
  }

  flushing = true

  if (batchTimer) {
    clearTimeout(batchTimer)
    batchTimer = null
  }

  const ids = [...batchIds]
  batchIds.length = 0

  try {
    const response = await fetch(
      import.meta.env.WXT_VIDEOS_URL + "batch",
      {
        method: "POST",
        body: JSON.stringify({ ids }),
      }
    )

    const resData = await response.json()
    console.log(resData)

    for (const item of resData.checked) {
      const callback = videos.get(item.id)


      if (callback) {
        callback({
          // isSlop: item.isSlop,
          isSlop: 1, // always return slop
        })

        videos.delete(item.id)
      }
    }
  } finally {
    flushing = false

    // handle requests that arrived during the fetch
    if (batchIds.length > 0) {
      queueMicrotask(flushBatch)
    }
  }
}

function batchCheckHandler(data: any, sendResponse: any) {
  batchIds.push(data.id)
  videos.set(data.id, sendResponse)

  // first item starts the timer
  if (!batchTimer) {
    batchTimer = setTimeout(() => {
      flushBatch()
    }, 400)
  }

  // flush immediately at 20
  if (batchIds.length >= 30) {
    flushBatch()
  }
}

