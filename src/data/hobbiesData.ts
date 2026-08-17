export interface Hobby {
  title: string;
  description: string;
  iconType: 'terminal' | 'cpu' | 'bike' | 'waves' | 'music';
  tags: string[];
  internalTarget?: string;
  targetLabel?: string;
}

export const hobbies: Hobby[] = [
  {
    title: "Linux ricing",
    description:
      "Things I watch too much YouTube about: distro hopping, dotfiles, CLI tools. Occasionally I open the terminal and actually try something.",
    iconType: "terminal",
    tags: ["Linux", "Open Source", "CLI Tools"],
  },
  {
    title: "Silicon news",
    description:
      "Process nodes, chip launches, the latest argument about ARM vs x86. I read more about CPUs than I'll ever buy.",
    iconType: "cpu",
    tags: ["CPU Architecture", "Semiconductors", "Hardware"],
  },
  {
    title: "Motorbike reviews",
    description:
      "Track days, long rides, gear breakdowns. Mostly sportbike and ADV stuff.",
    iconType: "bike",
    tags: ["Motorcycles", "Reviews", "Track Days"],
    internalTarget: "ataco",
    targetLabel: "Meet Ataco (Scrambler 400X) ↑",
  },
  {
    title: "Surfing",
    description:
      "Four lessons in Goa, first week of the year. Stood up a couple of times. Hooked.",
    iconType: "waves",
    tags: ["Surfing", "Goa", "Learning"],
  },
  {
    title: "Concerts",
    description: "On a break right now.",
    iconType: "music",
    tags: ["Live Music"],
  },
];
