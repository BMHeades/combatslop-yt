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

  // default options
  const settingsStorage = storage.defineItem<Settings>('sync:settings');
  settingsStorage.getValue().then(settings => {
    if (settings === null) {
      settingsStorage.setValue({
        scanOnHomePage: true,
        scanOnSearchPage: true,
        greyScaleImgs: false
      })
    }
  })

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
// const batchIds: any[] = []
// const videos = new Map<any, any>()
// let flushing = false

// async function batchCheckHandler(data: any, sendResponse: any) {
//   batchIds.push(data.id)
//   videos.set(data.id, sendResponse)

//   if (batchIds.length < 20 || flushing) {
//     return
//   }

//   flushing = true
//   const ids = [...batchIds]
//   batchIds.length = 0
//   try {
//     const response = await fetch(import.meta.env.WXT_VIDEOS_URL + "batch", {
//       method: "POST",
//       body: JSON.stringify({
//         ids
//       }),
//     })
//     const resData = await response.json()
//       console.log(resData)

//     for (const item of resData.checked) {
//       const callback = videos.get(item.id)
//       if (callback) {
//         console.log(item.isSlop)
//         callback({ isSlop: item.isSlop })
//         videos.delete(item.id)
//       }
//     }
//   } finally {
//     flushing = false
//   }
// }

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
          isSlop: item.isSlop,
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
    }, 300)
  }

  // flush immediately at 20
  if (batchIds.length >= 30) {
    flushBatch()
  }
}

