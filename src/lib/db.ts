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

    

	// Todo-related methods
    todos: {
        async fetchAll(): Promise<App.Todo[]> {
            const { data, error } = await supabase
                .from('todos')
                .select('*');
    
            console.log("sending todo data");
    
            if (error) {
                console.error(error);
                return []; // Return an empty array in case of error
            }
    
            // Cast the returned data to an array of Todo
            return (data as App.Todo[]) || [];
        },
        async add(newTodoText: string) {
            console.log("ready to send data to supabase");
            const { data, error } = await supabase
                .from('todos')
                .insert([{ text: newTodoText }]);

            if (error) {
                console.error(error);
                return null;
            }
            console.log("added Todo to supabase")
            return data;
        },
        async remove(todoId: number) {
            const { data, error } = await supabase
                .from('todos')
                .delete()
                .match({ id: todoId });

            if (error) {
                console.error(error);
                return null;
            }
            console.log("removed Todo from supabase")
            return data;
        },
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
