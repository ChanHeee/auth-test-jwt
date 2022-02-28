<script>
  import Router from 'svelte-spa-router';
  import Login from './routes/Login.svelte';
  import Main from './routes/Main.svelte';
  import Signup from './routes/Signup.svelte';

  const routes = {
    '/': Main,
    '/login': Login,
    '/signup': Signup,
  };
</script>

<body>
  <Router routes={routes} />
</body>
