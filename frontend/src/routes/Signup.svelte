<script>
  import Navbar from './../components/Navbar.svelte';
  import { pop, push } from 'svelte-spa-router';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { loggedin } from '../store';
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  onMount(() => {
    if ($loggedin) {
      pop();
    }
  });

  let email = '';
  let nick = '';
  let password = '';
  let passwordCheck = '';

  let emailInfo = false;
  let emailMessage = '';
  let nickInfo = false;
  let nickMessage = '';
  let passwordInfo = false;
  let passwordMessage = '';
  let passcheckInfo = false;
  let passcheckmessage = '';

  const inputFocus = () => {
    emailInfo = false;
    nickInfo = false;
    passwordInfo = false;
    passcheckInfo = false;
  };

  const signupHandler = async () => {
    if (email == '') {
      emailInfo = true;
      emailMessage = 'Please enter email.';
    } else if (nick == '') {
      nickInfo = true;
      nickMessage = 'Please enter nickname.';
    } else if (password == '') {
      passwordInfo = true;
      passwordMessage = 'Please enter password.';
    } else if (passwordCheck != password) {
      passcheckInfo = true;
      passcheckmessage = 'Passwords do not match.';
    } else {
      console.log('here', email, nick, password, passwordCheck);
      const { data } = await axios.post('/auth/join', {
        email,
        nick,
        password,
      });

      if (data.success) {
        push('/');
      } else {
        passcheckInfo = true;
        passcheckmessage = data;
      }
    }
  };
</script>

<div class="bg-slate-100">
  <Navbar />
  <div class="p-12 flex flex-col items-center">
    <h3 class="title ">Signup</h3>
    <div
      class="flex flex-col max-w-lg min-w-[40%] mx-auto px-10 py-8 bg-white rounded-xl "
    >
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input py-3 {emailInfo && 'is-danger'}"
            bind:value={email}
            on:focus={inputFocus}
            type="email"
            placeholder="hello@example.com"
          />
        </div>
        <p class="ml-2 mt-2 help text-[1rem] is-danger {emailInfo || 'hidden'}">
          {emailMessage}
        </p>
      </div>

      <div class="field">
        <label class="label">Nickname</label>
        <div class="control">
          <input
            class="input py-3 {nickInfo && 'is-danger'}"
            bind:value={nick}
            on:focus={inputFocus}
            type="text"
            placeholder="nickname"
          />
        </div>
        <p class="ml-2 mt-2 help text-[1rem] is-danger {nickInfo || 'hidden'}">
          {nickMessage}
        </p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input py-3 {passwordInfo && 'is-danger'}"
            bind:value={password}
            on:focus={inputFocus}
            type="password"
            placeholder="********"
          />
        </div>
        <p
          class="ml-2 mt-2 help text-[1rem] is-danger {passwordInfo ||
            'hidden'}"
        >
          {passwordMessage}
        </p>
      </div>

      <div class="field">
        <label class="label">Password Check</label>
        <div class="control">
          <input
            class="input py-3 {passcheckInfo && 'is-danger'}"
            bind:value={passwordCheck}
            on:focus={inputFocus}
            type="password"
            placeholder="********"
          />
        </div>
        <p
          class="ml-2 mt-2 help text-[1rem] is-danger {passcheckInfo ||
            'hidden'}"
        >
          {passcheckmessage}
        </p>
      </div>

      <button
        class="button mt-5 py-5 text-xl is-info font-medium"
        on:click={signupHandler}><strong>Signup</strong></button
      >
    </div>
  </div>
</div>
