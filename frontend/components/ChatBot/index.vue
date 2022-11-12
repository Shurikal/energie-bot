<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/solid";

const chat = ref([]);
const questionIndex = ref(0);
const loading = ref(false);

const addChat = (body, type) => {
  chat.value.push({
    body,
    type,
  });
};

const questions = ref([
  {
    text: "Was möchtest du verbessern?",
    type: "choice",
    options: [
      {
        text: "Energie",
        value: "energy",
      },
      {
        text: "Heizung",
        value: "heat",
      },
    ],
  },
  {
    text: "Was ist dir wichtig?",
    type: "choice",
    options: [
      {
        text: "Preis",
        value: "price",
      },
      {
        text: "Zukunftsorientierung",
        value: "future",
      },
      {
        text: "Geringe Wartungskosten",
        value: "maintenance",
      },
    ],
  },
  {
    text: "Um welches Objekt handelt es sich?",
    type: "address",
  },
]);

const answers = ref([]);

const addAnswer = async (answer) => {
  answers.value.push(answer);
  questionIndex.value++;
  addChat(answer.text, "user");

  await new Promise((resolve) => setTimeout(resolve, 300));

  if (questionIndex.value < questions.value.length) {
    addChat(questions.value[questionIndex.value].text, "bot");
  }
};

const sendChat = () => {
  addChat(
    "Hallo, kann ich dir helfen schnell und einfach Empfehlungen zu geben?",
    "bot"
  );
  addChat(questions.value[questionIndex.value].text, "bot");
};

sendChat();
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center justify-center rounded-full bg-red-500 p-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
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
          class="absolute bottom-20 right-0 z-10 w-screen max-w-sm px-4 sm:px-0 lg:max-w-lg"
        >
          <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative bg-gray-50 p-4 font-bold">
              Erhalte die ersten Empfehlungen
            </div>

            <div class="h-96 overflow-scroll bg-white p-4">
              <div class="flex w-full flex-col">
                <div v-for="(message, index) in chat" :key="`message-${index}`">
                  <ChatBotAnswer v-if="message.type === 'user'">{{
                    message.body
                  }}</ChatBotAnswer>
                  <ChatBotQuestion v-else>{{ message.body }}</ChatBotQuestion>
                </div>
              </div>
            </div>

            <div class="bg-gray-100 p-4">
              <div class="flex justify-end space-x-2">
                <button
                  v-if="questions[questionIndex].type === 'choice'"
                  v-for="(option, index) in questions[questionIndex].options"
                  :key="`option-${index}`"
                  class="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white"
                  @click="addAnswer(option)"
                >
                  {{ option.text }}
                </button>

                <div class="flex w-full" v-if="questions[questionIndex].type === 'address'">
                  <div class="grow px-4">
                    <input
                      class="w-full border-b-2 border-t-0 border-l-0 border-r-0 border-red-500 bg-transparent"
                      type="text"
                      placeholder="Adresse"
                    />
                  </div>
                  <div>
                    <button
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
                    >
                      <PaperAirplaneIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <div class="fixed transform -translate-x-full h-96 -translate-y-96 w-96 bg-red-900 text-white">
      <div class="container mx-auto">
        {{ answers}}
      </div>
    </div>
    <!-- 
    <button
      class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500"
    >
      <ChatBubbleOvalLeftIcon class="h-8 w-8 text-white" />
    </button> -->
  </div>
</template>
