import { writable } from "svelte/store";

export const state = writable<"idle" | "upload" | "preview" | "done">("idle");
