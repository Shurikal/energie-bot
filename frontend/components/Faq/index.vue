<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const faqs = [
  {
    question: "Kostet mich die Beratung etwas?",
    answer:
      "Nein, die Beratung ist für dich kostenlos. Die Stadt bezahlt die Beratung über die Förderung der Klimaschutzinitiative.",
  },
  {
    question: "Wie lange dauert die Beratung?",
    answer:
      "Die Beratung dauert ca. 1 Stunde. Wir besprechen deine Wünsche und Vorstellungen und erarbeiten gemeinsam eine Lösung.",
  },
  {
    question: "Woher weiss ich, ob meine Heizung effizient ist?",
    answer:
      "Wir besprechen mit dir, welche Möglichkeiten du hast und welche Lösung für dich am besten ist.",
  },
  {
    question: "Erhalte ich eine Förderung?",
    answer:
      "Je nachdem, welche Lösung du wählst, kannst du eine Förderung erhalten. Wir besprechen mit dir, welche Möglichkeiten du hast und welche Lösung für dich am besten ist.",
  },
  // More questions...
];
</script>

<template>
  <dl class="mt-6 space-y-6 divide-y divide-gray-200">
    <Disclosure
      as="div"
      v-for="faq in faqs"
      :key="faq.question"
      class="pt-6"
      v-slot="{ open }"
    >
      <dt class="text-base">
        <DisclosureButton
          class="flex w-full items-start justify-between text-left text-gray-400"
        >
          <span class="font-bold text-black">{{ faq.question }}</span>
          <span class="ml-6 flex h-7 items-center">
            <ChevronDownIcon
              :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']"
              aria-hidden="true"
            />
          </span>
        </DisclosureButton>
      </dt>
      <DisclosurePanel as="dd" class="mt-2 pr-12">
        <p class="text text-gray-500">{{ faq.answer }}</p>
      </DisclosurePanel>
    </Disclosure>
  </dl>
</template>
