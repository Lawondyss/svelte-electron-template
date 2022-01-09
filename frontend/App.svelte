<script>
    export let name

    const call = window.api
    let version = null

    // succeeded calls
    call('ping').then((data) => console.log('result of ping:', data))
    call('versionOf', 'electron').then((data) => (version = data))

    // failed call
    try {
        call('pong')
    } catch (err) {
        console.error(err)
    }
</script>

<main>
    <h1>Hello {name} from Electron <sup>{version}</sup></h1>
    <p>
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
        how to build Svelte apps.
    </p>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
