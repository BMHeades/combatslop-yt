
import App from '@/lib/Report.svelte'
import { mount, unmount } from 'svelte';


const injectedUIs: any = []

export const watchPage = (ctx: any) => {
    const id = location.href.match(/[?&]v=([^&]+)/)?.[1]
    console.log("watch page injection started on", id)

    if(id) injectReportUI(ctx, id)

    return () => {
        injectedUIs.forEach((ui: any) => ui.remove())
        console.log("watch page injection cleaned up")
    }
}

async function injectReportUI(ctx: any, id: string) {
    const ui = await createShadowRootUi(ctx, {
        name: 'icse-report',
        position: 'inline',
        anchor: '#top-level-buttons-computed',
        append: "first",
        onMount(container) {
            return mount(App, {
                target: container,
                props: {
                    id
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