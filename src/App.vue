<template>
    <!-- Static sidebar for desktop -->
    <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col overflow-y-auto bg-gray-50 px-1 ring-1 ring-gray-200">
            <nav class="flex flex-1 flex-col">
                <div class="text-center">
                    <div class="isolate inline-flex rounded-md shadow-xs mt-4 mb-4">
                        <button @click="resizeIframe(400)" type="button" class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 cursor-pointer">xs</button>
                        <button @click="resizeIframe(620)" type="button" class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 cursor-pointer">sm</button>
                        <button @click="resizeIframe(788)" type="button" class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 cursor-pointer">md</button>
                        <button @click="resizeIframe(1012)" type="button" class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 cursor-pointer">lg</button>
                        <button @click="resizeIframe(1220)" type="button" class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 cursor-pointer">xl</button>
                    </div>
                </div>

                <div class="p-2 mb-4">
                    <label class="block text-sm/6 font-medium text-gray-900">Select Page</label>
                    <Listbox v-model="selectedPage">
                        <div class="relative mt-1">
                            <ListboxButton class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span class="block truncate">{{ selectedPage.label }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>
                            <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                <ListboxOption v-slot="{ active, selected }" v-for="page in pages" :key="page.id" :value="page" as="template">
                                    <li :class="[active ? 'bg-amber-100 text-red-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4']">
                                        <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ page.label }}</span>
                                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </div>
                    </Listbox>

                    <label class="block text-sm/6 font-medium text-gray-900 mt-5">Select Payload</label>
                    <Listbox v-model="selectedPayload">
                        <div class="mt-1">
                            <ListboxButton class="w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span class="block truncate">{{ selectedPayload.name }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>
                            <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                <ListboxOption v-slot="{ active, selected }" v-for="payload in payloads" :key="payload.name" :value="payload" as="template">
                                    <li :class="[active ? 'bg-amber-100 text-red-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4']">
                                        <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ payload.name }}</span>
                                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </div>
                    </Listbox>
                    <div class="mt-4">
                        <button v-if="sendDataActive" @click="loadpayload()" class="flex justify-center gap-x-1.5 rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer w-full">
                            <div class="">Send Data</div>
                            <ArrowRightEndOnRectangleIcon class="-ml-0.5 size-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="xl:pl-72">
        <main class="flex gap-x-5 p-5">
            <div ref="iframeWrapper" class="flex border border-gray-400 rounded">
                <iframe id="iframe" ref="iframe" src="/default.html" :width="iframeWidth" height="860px"></iframe>
            </div>
            <div class="flex flex-grow flex-col overflow-scroll" style="height: 860px">
                <Disclosure as="div" class="mb-2" v-slot="{ open }" v-for="item in logs">
                    <DisclosureButton class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                        <span>Do you offer technical support?</span>
                        <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-purple-500" />
                    </DisclosureButton>
                    <DisclosurePanel class=""> <VCodeBlock :code="item" highlightjs lang="json" theme="atom-one-dark" code-block-radius=".3rem" /> </DisclosurePanel>
                </Disclosure>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { ArrowRightEndOnRectangleIcon, CheckIcon, ChevronUpIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
import { DocumentIcon } from '@heroicons/vue/24/outline';

const iframe = ref(null);
const iframeWrapper = ref(null);
const iframeWidth = ref('788px');

const pages = ref([]);
const selectedPage = ref({});

const payloads = ref([]);
const selectedPayload = ref({});

const sendDataActive = ref(false);

const logs = ref([]);

const resizeIframe = function (width) {
    console.log(`resize: ${width}px`);
    iframeWidth.value = `${width}px`;
};

const loadpage = function () {
    console.log('selectedPage: ', selectedPage.value);
    iframe.value.src = selectedPage.value.resource;
};

const loadpayload = function () {
    const payload = JSON.stringify(selectedPayload.value.data);
    console.log('payload: ', payload);

    logs.value.splice(0, 0, payload);

    const targetFrame = window.frames[0];
    console.log('targetFrame: ', targetFrame);

    targetFrame.postMessage(payload, '*');
};

const subscribeToReady = function (event) {
    console.log('subscribeToReady: ', event);
    //logger.innerHTML = logger.innerHTML + "<li>" + JSON.stringify(event.data) +  "</li>";
    if (event.data.event == 'READY') {
        sendDataActive.value = true;
        //document.getElementById("btnSendData").removeAttribute("disabled");
    } else if (event.data.event == 'SEND') {
        sendDataActive.value = false;
        //console.log(event);
        //var send = JSON.stringify(event.data);
        //var variabled = event.data.variables;
        //document.getElementById('sendData').innerText = send;
        //document.getElementById("btnSendData").addAttribute("disabled");
    } else if (event.data.event == 'START') {
        sendDataActive.value = true;
    }
};

// watch works directly on a ref
watch(selectedPage, async (newSelectedPage, oldSelectedPage) => {
    console.log('selectedPage: ', selectedPage.value);
    iframe.value.src = selectedPage.value.resource;
});

onMounted(() => {
    window.addEventListener('message', subscribeToReady, false);

    fetch('./assets/resource/sources.json')
        .then((response) => response.json())
        .then((json) => {
            pages.value = json.uis;
            selectedPage.value = json.uis[0];
        });

    fetch('./assets/resource/payloads.json')
        .then((response) => response.json())
        .then((json) => {
            payloads.value = json.payloads;
            selectedPayload.value = json.payloads[0];
        });
});
</script>
