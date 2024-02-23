<script lang="ts">
  import TodosList from '../../../lib/components/todos.svelte'
  
  export let data;
  const todos = data.todos

</script>

{#if data.session}
  <div class="flex flex-col items-center justify-center h-screen">
    
    <!-- Form to Add a New Todo -->
    <form 
      action="?/addTodo" 
      method="POST" 
      > 
      <input 
        type="text" 
        name="todoText" 
        placeholder="Type here" 
        class="input input-bordered input-error w-full max-w-xs" 
        /> 
        <button class="btn mt-5" type="submit">Add Todo</button> 
    </form> 

    <div class="content-center">
      <TodosList {todos}  />
    </div>

  </div>

{:else}
  <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-800">
        SQL CRUD Actions Demonstration
    </h1>
    <p class="mt-4 text-xl md:text-2xl lg:text-3xl text-gray-600">
        For purposes of spam, sign in to test my CRUD actions in my postgreSQL database for this page
    </p>
  </div>
{/if}


