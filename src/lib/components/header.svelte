<div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/About">About</a></li>
          <li>
            <a href="/Projects">Projects</a>
            <ul class="p-2">
              <li><a href="/Projects/Todos">SQL Queries</a></li>
              <li><a href="/Projects/Site">This website</a></li>
              <li><a href="/Projects/3D">3D Engine</a></li>
              <li><a href="/Projects/STM">STM32</a></li>

            </ul>
          </li>
          <li><a href="/Dashboard">Dashboard</a></li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost text-xl">Cade Thornton.com</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/About">About</a></li>
        <li>
          <details>
            <summary>Projects</summary>
            <ul class="p-2">
                <li><a href="/Projects/Todos">SQL Queries</a></li>
                <li><a href="/Projects/Site">This website</a></li>
                <li><a href="/Projects/3D">3D Engine</a></li>
                <li><a href="/Projects/STM">STM32</a></li>
            </ul>
          </details>
        </li>
        <li><a href="/Dashboard">Dashboard</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a href="/login" class="btn">Login</a>
    </div>
  </div>