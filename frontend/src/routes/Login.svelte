<script>
  import Navbar from './../components/Navbar.svelte';
  import { push, pop, replace } from 'svelte-spa-router';

  let email = '';
  let password = '';
  let remember = false;

  let emailDOM;
  let emailInfoDOM;
  let passwordDOM;
  let passwordInfoDOM;

  const inputFocus = () => {
    emailDOM.classList.remove('is-danger');
    emailInfoDOM.classList.add('hidden');
    passwordDOM.classList.remove('is-danger');
    passwordInfoDOM.classList.add('hidden');
  };

  const loginHandler = () => {
    emailDOM = document.getElementById('email');
    emailInfoDOM = document.getElementById('emailInfo');
    passwordDOM = document.getElementById('password');
    passwordInfoDOM = document.getElementById('passwordInfo');
    if (email == '') {
      emailDOM.classList.add('is-danger');
      emailInfoDOM.classList.remove('hidden');
      emailInfoDOM.innerText = 'Please input email.';
    } else if (password == '') {
      passwordDOM.classList.add('is-danger');
      passwordInfoDOM.classList.remove('hidden');
      passwordInfoDOM.innerText = 'Please input password.';
    } else {
      push('/');
    }
  };

  $: console.log(email, password);
</script>

<div class="h-screen bg-slate-100">
  <Navbar />
  <div class="p-12 flex flex-col items-center">
    <h3 class="title ">Login</h3>
    <hr class="flex h-2 bg-blue" />
    <p class="subtitle">Please login to proceed.</p>
    <div
      class="flex flex-col max-w-lg min-w-[40%] mx-auto p-10 bg-white rounded-xl "
    >
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            id="email"
            class="input py-5 text-xl"
            bind:value={email}
            on:focus={inputFocus}
            type="email"
            placeholder="hello@example.com"
          />
        </div>
        <p id="emailInfo" class="ml-2 mt-2 help text-lg hidden is-danger">
          This username is available
        </p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            id="password"
            class="input py-5 text-xl"
            bind:value={password}
            on:focus={inputFocus}
            type="password"
            placeholder="********"
          />
        </div>
        <p id="passwordInfo" class="ml-2 mt-2 help text-lg hidden is-danger">
          This username is available
        </p>
      </div>

      <div class="flex justify-center">
        <label class="checkbox mt-2">
          <input type="checkbox" bind:checked={remember} />
          Remember me
        </label>
      </div>

      <button
        class="button mt-5 py-5 text-xl is-info font-medium"
        on:click={loginHandler}><strong>Login</strong></button
      >
    </div>
  </div>
</div>
