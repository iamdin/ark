<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'

const toaster = createToaster({
  placement: 'bottom-end',
  gap: 24,
})

const addToast = () => {
  toaster.create({
    title: 'Toast Title',
    description: 'Toast Description',
    type: 'info',
    action: {
      label: 'Subscribe',
      onClick: () => {
        console.log('Subscribe')
      },
    },
  })
}
</script>

<template>
  <div>
    <button type="button" @click="addToast">Add Toast</button>
    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <Toast.Title>{{ toast.title }}</Toast.Title>
        <Toast.Description>{{ toast.description }}</Toast.Description>
        <Toast.ActionTrigger v-if="toast.action">{{ toast.action?.label }}</Toast.ActionTrigger>
      </Toast.Root>
    </Toaster>
  </div>
</template>
