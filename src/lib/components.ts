import Indicator from '@/lib/Indicator.svelte'
import ReportButtons from '@/lib/ReportButtons.svelte'
import { mount, unmount } from 'svelte';

export const mountIndicator = async(ctx: any, anchor: string | Element, id: any, isSlop: 0 | 1, append: 'first' | 'last' | 'after', autoMount = false) => {
  const ui = await createShadowRootUi(ctx, {
    name: 'slop-indicator',
    position: 'inline',
    append,
    anchor,
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
  autoMount? ui.autoMount(): ui.mount();
  console.log('mounted label')
  return () => {
    ui.remove()
  }
}

export const mountReportButtons = async(ctx: any, anchor: string | Element, id: any, append: 'first' | 'last' | 'after', autoMount = false) => {
  const ui = await createShadowRootUi(ctx, {
    name: 'slop-report-buttons',
    position: 'inline',
    append,
    anchor,
    onMount(container) {
      return mount(ReportButtons, {
        target: container,
        props: {
          id
        }
      })
    },
    onRemove(app) {
      if (app) unmount(app)
    }
  });
  autoMount? ui.autoMount(): ui.mount();


  return () => {
    ui.remove()
  }
}