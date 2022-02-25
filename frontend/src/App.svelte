<script>
  import Router from 'svelte-spa-router';
  import Login from './routes/Login.svelte';
  import Main from './routes/Main.svelte';

  const routes = {
    '/': Main,
    '/login': Login,
  };
</script>

<body>
  <Router routes={routes} />
</body>
