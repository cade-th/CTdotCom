import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { writable } from 'svelte/store';

const userStore = writable();

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.getSession().then(({ data }) => {
	userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
	} //hi
});

export default {

    get user() {
		return userStore;
	},

    signIn(email: any) {
		return supabase.auth.signInWithOtp({ email });
	},
	signOut() {
		return supabase.auth.signOut();
    },

    test: {

        async get(id: any) {
            const { data } = await supabase
				.from('test')
				.select('id')
				
			return data;
        }
    }
}
