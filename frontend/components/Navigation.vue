<script setup>
</script>

<template>
  <nav class="h-16">
    <div class="container mx-auto flex h-full items-center justify-between">
      <div>
        <NuxtLink to="/">
          <img src="~/assets/img/logo.png" alt="logo" class="h-8" />
        </NuxtLink>
      </div>
      <div>
        <ul class="flex space-x-6">
          <li>
            <NuxtLink
              class="relative rounded-md py-1 text-gray-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:origin-center after:scale-x-0 after:transform after:bg-red-500 after:transition-all after:duration-300 after:content-[''] hover:text-gray-900 hover:after:scale-x-100"
              to="/"
              >Beratung</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="relative rounded-md py-1 text-gray-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:origin-center after:scale-x-0 after:transform after:bg-red-500 after:transition-all after:duration-300 after:content-[''] hover:text-gray-900 hover:after:scale-x-100"
              to="/about"
              >Heizung</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="relative rounded-md py-1 text-gray-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:origin-center after:scale-x-0 after:transform after:bg-red-500 after:transition-all after:duration-300 after:content-[''] hover:text-gray-900 hover:after:scale-x-100"
              to="/contact"
              >Energie</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="relative rounded-md py-1 text-gray-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:origin-center after:scale-x-0 after:transform after:bg-red-500 after:transition-all after:duration-300 after:content-[''] hover:text-gray-900 hover:after:scale-x-100"
              to="/contact"
              >Mieter</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <NuxtLink class="transition-all duration-300  bg-white rounded-full py-1 px-4 text-black border-2 border-black hover:bg-black hover:text-white text-sm font-bold" to="/login">Login</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
