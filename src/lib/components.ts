import App from '@/lib/Indicator.svelte'
import { mount, unmount } from 'svelte';

export const mountIndicator = async(ctx: any, anchor: Element, id: any, isSlop: 0 | 1, append: 'last' | 'after') => {
  const ui = await createShadowRootUi(ctx, {
    name: 'slop-indicator',
    position: 'inline',
    append,
    anchor,
    onMount(container) {
      return mount(App, {
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
  ui.mount();

  return () => {
    ui.remove()
  }
}