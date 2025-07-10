<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <main class="flex-1 pt-14">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
