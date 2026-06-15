// import tailwind from '../../assets/tailwind.css?inline'

import App from './Report.svelte'
import { mount, unmount } from 'svelte';




const injectedUIs: any = []

export const watchPage = (ctx: any) => {
    console.log("watch page injection started")

    const anchor = document.querySelector("segmented-like-dislike-button-view-model")
    injectUI(ctx, anchor)

    return () => {
        injectedUIs.forEach((ui: any) => ui.remove())
        console.log("watch page injection cleaned up")
    }
}

async function injectUI(ctx: any, anchor: any) {

    const ui = await createShadowRootUi(ctx, {
        name: 'injected-indicator',
        position: 'inline',
        anchor: "#actions",
        append(anchor, ui) {
            anchor.insertBefore(ui, anchor.firstChild)
        },
        onMount(container) {
            return mount(App, {
                target: container,
                props: {
                    id: 1
                }
            })
        },
        onRemove(app) {
            if(app) unmount(app)
        }
    });
    injectedUIs.push(ui);
    // 4. Mount the UI
    ui.autoMount();
}