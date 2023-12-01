import { createContext } from "react";

export const FormContext = createContext({
  divisions: ["Kontrol", "Mekanik", "Official", "Both", "All"],
  roles: [
    "Ketua",
    "Wakil Ketua",
    "Manpro R1",
    "Manpro R2",
    "Kepala Divisi Mekanik",
    "Kepala Divisi Kontrol",
    "Kru Mekanik",
    "Kru Kontrol",
    "Official",
  ],
  generations: [13, 14, 15],
});
