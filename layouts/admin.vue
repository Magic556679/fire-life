<template>
  <div class="flex">
    <AdminSidebar />
    <div class="w-full">
      <AdminHeader />
      <div class="m-4">
        <slot />
      </div>
    </div>
  </div>
</template>
