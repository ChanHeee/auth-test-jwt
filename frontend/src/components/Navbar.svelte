<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import { nick, loggedin } from '../store';
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  onMount(async () => {
    const accessToken = getCookie('accessToken');
    const { data } = await axios.get('/auth/logincheck', {
      headers: { authorization: accessToken },
    });
    console.log(data);
    if (data.success) {
      $nick = data.user.nick;
      $loggedin = data.success;
    } else {
      const { data } = await axios.get('/auth/refresh', {
        headers: {
          authorization: accessToken,
          refreshToken: getCookie('refreshToken'),
        },
      });
      if (data.success) {
        $nick = data.user.nick;
      }
      $loggedin = data.success;
    }
  });

  const logoutHandler = async () => {
    const { data } = await axios.get('/auth/logout');
    if (data.success) {
      $loggedin = false;
    }
    console.log($loggedin);
  };
</script>

<nav class="navbar px-10 py-2" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
    </a>

    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item"> Home </a>

      <a class="navbar-item"> Documentation </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"> More </a>

        <div class="navbar-dropdown">
          <a class="navbar-item"> About </a>
          <a class="navbar-item"> Jobs </a>
          <a class="navbar-item"> Contact </a>
          <hr class="navbar-divider" />
          <a class="navbar-item"> Report an issue </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons flex items-center">
          {#if !$loggedin}
            <a class="button is-info" href="/#/signup">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/#/login"><strong>Login</strong></a
            >
          {:else}
            <p class="mr-4 text-lg">
              <strong>{$nick}</strong>
            </p>
            <a class="button is-info mb-0" on:click={logoutHandler}>
              <strong>Logout</strong>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>
