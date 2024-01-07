<script lang="ts">
    import { writable } from 'svelte/store';
    import { Canvas, T } from '@threlte/core';
    import { onMount } from 'svelte';

    export let cubePosition = { x: 0, y: 0, z: 0 };
    const cubeRotation = writable<[number, number, number]>([0, 0, 0]);

    function rotateCube() {
        cubeRotation.update(([x, y, z]) => {
            return [x + 0.01, y + 0.01, z + 0.01];
        });
        requestAnimationFrame(rotateCube); // Continuously call rotateCube
    }

    onMount(() => {
        requestAnimationFrame(rotateCube); // Start the animation loop
    });
</script>

<Canvas>
    <T.PerspectiveCamera fov={75} makeDefault position={[0, 0, 5]} />
    <T.Mesh position={[cubePosition.x, cubePosition.y, cubePosition.z]}
             rotation={$cubeRotation}>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshBasicMaterial color="black" />
    </T.Mesh>
</Canvas>

