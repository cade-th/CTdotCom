<script lang="ts">
    import { enhance } from '$app/forms';

    // Assuming Todo has properties like id, title, and completed
    export let todos: App.Todo[] = [];
</script>

<div class="overflow-x-auto w-full mt-6">
    <table class="table w-full">
        <tbody>
            {#each todos as todo}
                <tr>
                    <td>{todo.text}</td> <!-- Assuming the property is 'title' -->
                    <td>
                        <form 
                            method="POST" 
                            action="?/removeTodo" 
                            >
                            <input type="hidden" name="todoID" value={todo.id} />
                            <button class="btn btn-error text-white btn-xs">Delete</button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

