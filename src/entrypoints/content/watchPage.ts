
import Report from '@/lib/ReportButtons.svelte'
import Indicator from '@/lib/Indicator.svelte'
import { mount, unmount } from 'svelte';
import { feedAnchorSelector, feedCardSelector, feedLinkSelector } from '@/utils/selectors';


const injectedUIs: any = []

export const watchPage = (ctx: any, config: Config, url: URL) => {

    const feed = feedScanner(ctx, config, feedCardSelector, feedAnchorSelector, feedLinkSelector)

    const id = url.href.match(/[?&]v=([^&]+)/)?.[1]
    console.log("watch page injection started on", id)

    // const anchorReport = '#top-level-buttons-computed:has(segmented-like-dislike-button-view-model)'
    const anchorIndicator = '#above-the-fold>#title'

    function onNavigate() {
        console.log('new page loaded');
        if (id) {
            injectReportUI(ctx, id, anchorIndicator)

            // injectIndicatorUI(ctx, id, anchorIndicator, true)

            browser.runtime.sendMessage({
                type: "batchCheck",
                // type: "check", // temporary null origin on GET fix
                id
            }).then((data: ScannedSlop) => {

                // if slop detected
                if (data.isSlop !== 0 && data.isSlop !== 1) return

                injectIndicatorUI(ctx, id, anchorIndicator, data.isSlop)

            })
        }
    }

    window.addEventListener('yt-navigate-finish', onNavigate, {once: true});

    return () => {
        window.removeEventListener('yt-navigate-finish', onNavigate);

        injectedUIs.forEach((ui: any) => ui.remove())

        feed()
        injectedUIs.length = 0
        console.log("watch page injection cleaned up")
    }
}

async function injectReportUI(ctx: any, id: string, anchor: string) {
    const ui = await createShadowRootUi(ctx, {
        name: 'slop-report',
        position: 'inline',
        anchor,
        append: "last",
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
            if (app) unmount(app)
        }
    });
    injectedUIs.push(ui);
    ui.autoMount();
    console.log("injected report")
}

async function injectIndicatorUI(ctx: any, id: any, anchor: any, isSlop: 0 | 1) {
    const ui = await createShadowRootUi(ctx, {
        name: 'slop-indicator',
        position: 'inline',
        anchor,
        append: "first",
        onMount(container) {
            return mount(Indicator, {
                target: container,
                props: {
                    id,
                    isSlop,
                }
            })
        },
        onRemove(app) {
            if (app) unmount(app)
        }
    });
    injectedUIs.push(ui);
    ui.autoMount();
    console.log("injected indicator")

}