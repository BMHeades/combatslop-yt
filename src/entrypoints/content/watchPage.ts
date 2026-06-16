
import App from '@/lib/Report.svelte'
import { mount, unmount } from 'svelte';


const injectedUIs: any = []

export const watchPage = (ctx: any, url: URL) => {
    const id = url.href.match(/[?&]v=([^&]+)/)?.[1]
    console.log("watch page injection started on", id)

    const anchorSelector = 'ytd-menu-renderer>#top-level-buttons-computed.ytd-menu-renderer:has(segmented-like-dislike-button-view-model)'

    const anchor = document.querySelector(anchorSelector)

    function onNavigate() {
        console.log('new page loaded');
        if (id) injectReportUI(ctx, id, anchorSelector)
    }

    window.addEventListener('yt-navigate-finish', onNavigate);

    return () => {
        window.removeEventListener('yt-navigate-finish', onNavigate);

        injectedUIs.forEach((ui: any) => ui.remove())
        console.log("watch page injection cleaned up")
    }
}

async function injectReportUI(ctx: any, id: string, anchor: string) {
    const ui = await createShadowRootUi(ctx, {
        name: 'slop-report',
        position: 'inline',
        anchor,
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
            console.log("unmount slop-report")
            unmount(app)
        }
    });
    injectedUIs.push(ui);
    // 4. Mount the UI
    ui.autoMount({ once: true });
    console.log("injected")
}
