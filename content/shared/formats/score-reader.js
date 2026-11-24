export function mountScoreReader(heading, content, { controls = [], navigation, preserveView = change => change() } = {}) {
  const opener = document.createElement('button');
  opener.type = 'button';
  opener.className = 'score-reader-trigger';
  opener.textContent = '展开谱面';
  opener.setAttribute('aria-haspopup', 'dialog');
  heading.after(opener);

  opener.addEventListener('click', () => {
    const pagePosition = { left: scrollX, top: scrollY, behavior: 'instant' };
    const dialog = document.createElement('dialog');
    dialog.className = 'score-reader';
    dialog.dataset.view = 'wide';
    dialog.setAttribute('aria-label', heading.textContent.trim());
    dialog.innerHTML = `
      <header class="score-reader-header">
        <h2></h2>
        <button class="score-reader-close" type="button" autofocus>收起谱面</button>
      </header>
      <div class="score-reader-tools">
        <div class="score-reader-modes" role="group" aria-label="谱面宽度">
          <button type="button" data-score-view="fit" aria-pressed="false">适宽</button>
          <button type="button" data-score-view="wide" aria-pressed="true">宽谱</button>
        </div>
      </div>
      <div class="score-reader-navigation"></div>
      <div class="score-reader-body"></div>
    `;
    dialog.querySelector('h2').textContent = heading.textContent.trim();
    const close = dialog.querySelector('.score-reader-close');
    const tools = dialog.querySelector('.score-reader-tools');
    const body = dialog.querySelector('.score-reader-body');
    const modes = tools.querySelector('.score-reader-modes');
    const viewButtons = [...modes.querySelectorAll('button')];
    if (!controls.length) {
      body.tabIndex = 0;
      body.setAttribute('role', 'region');
      body.setAttribute('aria-label', '谱面');
    }

    const restore = [];
    function move(element, destination, before = null) {
      const anchor = document.createComment('');
      element.before(anchor);
      destination.insertBefore(element, before);
      restore.push(() => anchor.replaceWith(element));
    }

    function dismiss() {
      preserveView(() => {
        dialog.close();
        for (const putBack of restore.reverse()) putBack();
        dialog.remove();
      });
      opener.focus({ preventScroll: true });
      window.scrollTo(pagePosition);
    }

    close.addEventListener('click', dismiss);
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      dismiss();
    });

    for (const button of viewButtons) {
      button.addEventListener('click', () => {
        const view = button.dataset.scoreView;
        if (dialog.dataset.view === view) return;
        const height = content.getBoundingClientRect().height;
        const top = body.scrollTop;
        preserveView(() => { dialog.dataset.view = view; });
        if (!controls.length && height) body.scrollTop = top * content.getBoundingClientRect().height / height;
        for (const option of viewButtons) option.setAttribute('aria-pressed', String(option === button));
      });
    }

    preserveView(() => {
      move(content, body);
      for (const control of controls) move(control, tools, modes);
      if (navigation) move(navigation, dialog.querySelector('.score-reader-navigation'));
      document.body.append(dialog);
      dialog.showModal();
    });
  });
}
