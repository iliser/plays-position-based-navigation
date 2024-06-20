<script lang="ts">
    import { kbGFocus } from "$lib/kb_focus_handler";

    const { gfocus, windowKeydown } = kbGFocus("selected");

    let showBoxes = $state(false);

    let focusable = function (node: HTMLElement) {
        node.classList.add("focusable_outline");
        const f = gfocus(node);

        return {
            destroy() {
                node.classList.remove(".focusable_outline");
                f.destroy();
            },
        };
    };
    $effect(() => console.log(focusable));

    const bindignFeatures = [
        ["Keyboard bindings for movements (up,down,left,right)", true],
        ["Keyboard bindings for focus/click (Enter)", true],
        [
            "Browser focus escape (Escape, double movement to border in start/end)",
            true,
        ],
        ["Clickable elements (buttons, links, checkboxes)", true],
        ["Focusable by default elements (textarea, input)", true],
        ["Autofocus elements", true],
        ["Focusable by param elements", false],
        ["Clickable by param elements", false],
        ["Hover for focus", false],
    ] as const;
</script>

<svelte:window on:keydown={windowKeydown} />

<div class="viewport" class:show-focusable={showBoxes}>
    <h1>Position based focus</h1>

    <p use:focusable>
        Allow to focus element based on position of this element on screen.
    </p>

    <p use:focusable>
        You can navigate through this page by using arrow keys + enter for
        "click" into elements
    </p>

    <p use:focusable>
        Utils is split into two parts. First defines which element is focused
        now, can be focused and manage focus movement by directional events like
        <br />
        <code> type Direction = "right" | "left" | "up" | "down"; </code>
        <br />
        This part is framework agnostic and operate over html dom elements
        <br />
        It just emit focus change event on movement and manage current focused node.
    </p>

    <p use:focusable>
        Second part is responsible for integration first part with dom or
        framework used
        <br />
        It manages keybindings, adding dom elements into registry, remove dom elements
        from registry, react on focus change events, and manage clicks inputs
    </p>
    <p>
        This page implemented on svelte and second part uses <a
            use:focusable
            href="https://learn.svelte.dev/tutorial/actions">svelte actions</a
        > feature for manage focusable elements
    </p>

    <p use:focusable>
        Current limitation is you can't nest focusable into each other. Cause <code
            >'in' | 'out'</code
        > movement direction is not implemented right now, and this implementation
        just proof of concept.
    </p>

    <h3>Implemented features</h3>
    <h4>Core</h4>
    <div use:focusable>
        <label>
            <input type="checkbox" checked={true} />
            Focus management
        </label>
    </div>

    <div use:focusable>
        <label>
            <input type="checkbox" checked={true} />
            Horizontal + Vertical movements
        </label>
    </div>
    <div use:focusable>
        <label>
            <input type="checkbox" checked={true} />
            Focus change events
        </label>
    </div>
    <div use:focusable>
        <label>
            <input type="checkbox" checked={false} />
            Nested(In + Out) movements
        </label>
    </div>
    <h4>Svelte binding</h4>
    {#each bindignFeatures as [text, checked]}
        <div use:focusable>
            <label>
                <input type="checkbox" {checked} />
                {text}
            </label>
        </div>
    {/each}
    <h3>Some examples</h3>
    <label use:focusable>
        <input type="checkbox" bind:checked={showBoxes} />
        Show outline around focusable elements
    </label>

    <a href="/grid" use:focusable>Grid example</a>
    <input type="text" use:focusable />
</div>

<style>
    .show-focusable :global(.focusable_outline) {
        outline: 1px solid white;
    }

    .show-focusable :global(.selected),
    :global(.selected) {
        outline: 1px solid lime;
    }

    .viewport {
        max-width: 760px;
        margin: auto auto;
    }
    a {
        color: white;
        text-decoration: underline;
        font-weight: bold;
    }
    a:visited {
        color: rgba(255, 255, 255, 0.75);
    }

    :global(body) {
        /* background-color: #1f1f1f; */
        background-color: black;
        color: white;
    }
</style>
