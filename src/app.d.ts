// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { SupabaseClient } from "@supabase/supabase-js";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>
		}
		interface Todo {
			id: number;
			text: string;
			// Include other properties of a todo item here
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
