
import Report from '@/lib/Report.svelte'
import Indicator from '@/lib/Indicator.svelte'
import { mount, unmount } from 'svelte';


const injectedUIs: any = []

export const watchPage = (ctx: any, url: URL) => {
    const id = url.href.match(/[?&]v=([^&]+)/)?.[1]
    console.log("watch page injection started on", id)

    const anchorReport = '#top-level-buttons-computed:has(segmented-like-dislike-button-view-model)'
    const anchorIndicator = '#above-the-fold>#title'

    function onNavigate() {
        console.log('new page loaded');
        if (id) {
            injectReportUI(ctx, id, anchorReport)
            injectIndicatorUI(ctx, id, anchorIndicator, true)
        }
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
            return mount(Report, {
                target: container,
                props: {
                    id
                }
            })
        },
        onRemove(app) {
            console.log("unmount slop-report")
            if(app) unmount(app)
        }
    });
    injectedUIs.push(ui);
    // 4. Mount the UI
    ui.autoMount({ once: true });
    console.log("injected report")
}

async function injectIndicatorUI(ctx: any, id: any, anchor: any, isSlop: boolean) {
    const ui = await createShadowRootUi(ctx, {
        name: 'slop-indicator',
        position: 'inline',
        anchor,
        // append: "after",
        onMount(container) {
            return mount(Indicator, {
                target: container,
                props: {
                    id,
                    isSlop
                }
            })
        },
        onRemove(app) {
            if (app) unmount(app)
        }
    });
    // 4. Mount the UI
    injectedUIs.push(ui);
    ui.autoMount();
    console.log("injected indicator")

}