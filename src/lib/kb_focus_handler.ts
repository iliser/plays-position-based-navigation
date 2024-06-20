export type Direction = 'up' | 'down' | 'left' | 'right';

// manage focused element and directional movement
export class KeyboardFocus {
    focused: HTMLElement | null = null;
    targets: Set<HTMLElement> = new Set();


    constructor(
        public onFocusChange: (prev: HTMLElement | null, next: HTMLElement | null) => void
    ) { }

    findMatch(
        focused: HTMLElement,
        filter: (r: DOMRect) => boolean,
        dir: Direction
    ) {

        const fr = focused.getBoundingClientRect();
        function origin(a: DOMRect) {
            const ay = (a.top + a.bottom) / 2,
                ax = (a.left + a.right) / 2;
            switch (dir) {
                case 'down':
                    return [ax, a.top];
                case 'up':
                    return [ax, a.bottom];
                case 'left':
                    return [a.right, ay];
                case 'right':
                    return [a.left, ay];
            }
        }
        function distance(a: DOMRect, b: DOMRect) {
            // const ax = (a.top + a.bottom) / 2,
            // 	ay = (a.left + a.right) / 2;
            // const bx = (b.top + b.bottom) / 2,
            // 	by = (b.left + b.right) / 2;

            const [ax, ay] = origin(a);
            const [bx, by] = origin(b);

            const dx = ax - bx,
                dy = ay - by;
            return dx * dx + dy * dy;
        }



        let min_value: number = 1e9;
        let min_element: HTMLElement | null = null;
        for (const e of this.targets) {
            const r = e.getBoundingClientRect();
            if (!filter(r)) continue;

            const d = distance(r, fr);
            if (d < min_value) {
                min_element = e;
                min_value = d;
            }
        }

        return min_element;
    }

    focus(node: HTMLElement) {
        if (node == this.focused) return;
        const prev = this.focused;
        this.focused = node;
        this.onFocusChange(prev, node);
    }
    unfocus() {
        const prev = this.focused;
        this.focused = null;
        this.onFocusChange(prev, null);
    }

    blur() {
        this.unfocus()
    }

    move(dir: 'up' | 'down' | 'left' | 'right') {
        console.time('move');
        if (this.focused == null) {
            const iter = this.targets.values();
            this.focused = iter.next().value;
            this.onFocusChange(null, this.focused!);
        } else {
            const fr = this.focused.getBoundingClientRect();

            let best = this.findMatch(
                this.focused,
                {
                    up: (r: DOMRect) => r.bottom <= fr.top,
                    down: (r: DOMRect) => r.top >= fr.bottom,
                    left: (r: DOMRect) => r.right <= fr.left,
                    right: (r: DOMRect) => r.left >= fr.right
                }[dir],
                dir
            );
            if (best != null) {
                const prev = this.focused;
                this.focused = best;
                this.onFocusChange(prev, best);
            }
        }
        console.timeEnd('move');
    }


}


// implementation
export function kbGFocus(classname: string) {
    const autofocusKey = "kbgf_autofocus";
    const kb = new KeyboardFocus(function (prev, next) {
        prev?.blur();
        prev?.classList.remove(classname);
        next?.classList.add(classname);
        next?.scrollIntoView({
            block: 'center',
            inline: 'center',
            behavior: 'smooth'
        });

        if (next?.dataset[autofocusKey] != undefined) {
            next?.focus();
        }
    });

    function focusableAction(
        node: HTMLElement,
        params?: { autofocus?: boolean }

    ) {
        kb.targets.add(node);
        return {
            destroy: function () {
                kb.targets.delete(node);
            }
        };
    }

    function inputAction(
        node: HTMLElement,
        params?: { autofocus?: boolean }
    ) {
        const actRes = focusableAction(node);
        const focus = function (e: Event) {
            const target = e.target;
            if (target == null) return;
            kb.focus(target as HTMLElement);
        }
        const keydown = (e: any) => {
            e.stopPropagation();
            const input = e.target;
            const l = input.value.length;
            const ss = input.selectionStart;
            if (e.key == 'ArrowDown') {
                if (ss >= l) kb.move('down');
            }
            if (e.key == 'ArrowUp') {
                if (ss == 0) kb.move('up');
                e.stopPropagation();
            }
            if (e.key == 'ArrowLeft') {
                if (ss == 0) kb.move('left');
            }
            if (e.key == 'ArrowRight') {
                if (ss >= l) kb.move('right');
            }
            if (e.key == 'Escape') {
                e.target?.blur();
            }
        };
        node.addEventListener('keydown', keydown);
        node.addEventListener('focus', focus);

        if (params?.autofocus) node.dataset[autofocusKey] = 'true';

        return {
            destroy() {
                if (params?.autofocus) node.dataset[autofocusKey] = undefined;
                actRes.destroy();
                node.removeEventListener('keydown', keydown);
                node.removeEventListener('focus', focus);
            }
        };
    }

    function dynAction(node: HTMLElement, params?: { autofocus?: boolean }) {
        const tag = node.tagName.toLowerCase();
        if (tag == 'textarea' || tag == 'input') return inputAction(node, params);
        return focusableAction(node, params);
    }


    function isClickable(node: HTMLElement) {
        const tag = node.tagName.toLowerCase();

        return tag == 'button' || tag == 'a' || tag == 'label' || node.attributes.getNamedItem('data-isclickable');
    }

    function isFocusable(node: HTMLElement) {
        const tag = node.tagName.toLowerCase();
        return tag == 'input' || tag == 'textarea' || node.attributes.getNamedItem('data-isfocusable');
    }

    function windowKeydown(event: KeyboardEvent) {
        if (event.code == 'ArrowLeft') {
            event.preventDefault();
            kb.move('left');
        }
        if (event.code == 'ArrowRight') {
            event.preventDefault();
            kb.move('right');
        }
        if (event.code == 'ArrowDown') {
            event.preventDefault();

            kb.move('down');
        }
        if (event.code == 'ArrowUp') {
            event.preventDefault();
            kb.move('up');
        }
        if (event.code == 'Enter') {
            event.preventDefault();
            if (!kb.focused) return;

            if (isFocusable(kb.focused)) kb.focused.focus();
            if (isClickable(kb.focused)) kb.focused.click();
        }
    }

    return {
        gfocus: dynAction,
        windowKeydown,
    }
}