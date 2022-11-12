<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChatBubbleOvalLeftIcon } from "@heroicons/vue/24/solid";
import { ChatBotQuestion } from '~~/.nuxt/components';

const answers = ref({})

const questions = ref([
  {
    question: "",
    possibleAnswers: [
      {
        answer: "Ich bin Mieter",
        nextQuestion: "Ich bin Mieter",
      },
      {
        answer: "Ich bin Eigentümer",
        nextQuestion: "Ich bin Eigentümer",
      },
    ],
  }
])

const addAnswer = (questionKey, answer) => {
  answers.value[questionKey] = answer
}
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center rounded-full bg-red-500 justify-center p-3 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-red-800"
      >
        <ChatBubbleOvalLeftIcon class="h-8 w-8 text-white" />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute z-10 w-screen max-w-sm bottom-20 right-0 px-4 sm:px-0 lg:max-w-lg"
        >
          <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative bg-gray-50 p-4 font-bold">
              Erhalte die ersten Empfehlungen
            </div>

            <div class="bg-white p-4 h-96 overflow-scroll">
              <div class="w-full flex flex-col">


              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
    <!-- 
    <button
      class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500"
    >
      <ChatBubbleOvalLeftIcon class="h-8 w-8 text-white" />
    </button> -->
  </div>
</template>
