<div class="p-16 bg-slate-100 h-screen flex flex-col items-center">
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
          class="input py-5 text-xl"
          type="text"
          placeholder="hello@example.com"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input py-5 text-xl" type="text" placeholder="********" />
      </div>
      <p class="help hidden">This username is available</p>
    </div>

    <div class="flex justify-center">
      <label class="checkbox mt-2">
        <input type="checkbox" />
        Remember me
      </label>
    </div>

    <button class="button mt-5 py-5 text-xl is-info font-medium">Login</button>
  </div>
</div>
