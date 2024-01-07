<script>
    import { goto } from '$app/navigation';

    export let data;

    let isLogin = true;
    let isForgotPassword = false;
    let email = '';
    let password = '';
    let confirmPassword = '';

    let passwordResetEmailSent = false; // New state variable
    let registrationEmailSent = false; // New state variable for registration email


    let passwordsMatch = true;
    $: passwordsMatch = isLogin || password === confirmPassword;

    let { supabase } = data;

    async function handleSubmit() {
        if (isForgotPassword) {
            await handleForgotPassword();
            return;
        }

        if (!isLogin && !passwordsMatch) {
            console.error("Passwords do not match");
            return;
        }

        if (isLogin) {
            await signInWithEmail();
        } else {
            await signUpNewUser();
        }
    }

    async function handleForgotPassword() {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (!error) {
            passwordResetEmailSent = true; // Update the state
            // You can also handle redirection or additional logic here
        } else {
            console.error(error.message);
            passwordResetEmailSent = false; // Reset the state in case of an error
        }
    }

    async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: '/'
        }
    });
    if (!error) {
        // Set the registration email sent flag to true
        registrationEmailSent = true;
        // You can also add additional logic or redirection here if needed
    } else {
        console.error(error.message);
        registrationEmailSent = false; // Reset the state in case of an error
    }
}


async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (!error) {
        // Redirect to home page on successful login
        goto('/');
    } else {
        // Handle the error, such as displaying a message to the user
        console.error(error.message);
    }
}


    function resetToLogin() {
        isForgotPassword = false;
        isLogin = true;
        passwordResetEmailSent = false;
        registrationEmailSent = false; // Reset the registration email sent flag
    }



    // ... (signUpNewUser and signInWithEmail functions remain unchanged)
    function switchToForgotPassword() {
        isForgotPassword = true;
        isLogin = false;
    }

    function toggleForm() {
        isLogin = !isLogin;
        isForgotPassword = false;
    }

</script>

<div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-xs">
        
        {#if registrationEmailSent}
            <!-- Registration confirmation message -->
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
                <p class="text-green-600">A confirmation email has been sent to your email address. Please check your inbox to complete the registration process.</p>
                <button class="mt-4 text-sm text-blue-500 hover:text-blue-800" type="button" on:click={resetToLogin}>
                    Return to Login
                </button>
            </div>
            
        {:else}
            {#if passwordResetEmailSent}
                <!-- Password reset confirmation message -->
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
                    <p class="text-green-600">A password reset email has been sent to your email address.</p>
                    <button class="mt-4 text-sm text-blue-500 hover:text-blue-800" type="button" on:click={resetToLogin}>
                        Return to Login
                    </button>
                </div>
            {:else if isForgotPassword}
                <!-- Forgotten password form -->
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email">
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Reset Password
                        </button>
                        <button class="text-sm text-blue-500 hover:text-blue-800" type="button" on:click={resetToLogin}>
                            Back to Login
                        </button>
                    </div>
                </div>
            {:else}
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
                    </div>

                    {#if !isForgotPassword}
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input bind:value={password} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
                        </div>
                        {#if !isLogin}
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">
                                    Confirm Password
                                </label>
                                <input bind:value={confirmPassword} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" placeholder="Confirm Password">
                                {#if !passwordsMatch}
                                    <p class="text-red-500 text-xs italic">Passwords do not match.</p>
                                {/if}
                            </div>
                        {/if}
                    {/if}

                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {#if isLogin}Login{:else if isForgotPassword}Reset Password{:else}Register{/if}
                        </button>
                        {#if isLogin}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" on:click={switchToForgotPassword}>
                                Forgot Password?
                            </a>
                        {/if}
                    </div>
                    <div class="text-center mt-4">
                        {#if !isForgotPassword}
                            <button class="text-sm text-blue-500 hover:text-blue-800" type="button" on:click={toggleForm}>
                                {#if isLogin}Need an account? Register{:else}Have an account? Login{/if}
                            </button>
                        {/if}
                    </div>
                </form>
            {/if}
        {/if}
    </div>
</div>