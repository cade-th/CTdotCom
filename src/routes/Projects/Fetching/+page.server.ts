// src/routes/your-route/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');

        const apiData: Comment[] = await response.json();

        return {
            apiData
        };

};
