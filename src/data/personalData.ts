export interface PersonalCategoryItem {
  label: string;
  value: string;
}

export interface PersonalCategory {
  title: string;
  iconType: 'user' | 'heart' | 'languages';
  items: PersonalCategoryItem[];
}

export const personalCategories: PersonalCategory[] = [
  {
    title: "Physical Stats",
    iconType: 'user',
    items: [
      { label: "Height", value: "5'11\" (181 cm)" },
      { label: "Weight", value: "72 KG (159 lbs)" },
      { label: "Build", value: "Tall skinny fat, slight athletic" }
    ]
  },
  {
    title: "Food Preferences",
    iconType: 'heart',
    items: [
      { label: "🍜", value: "Masala over bland" },
      { label: "☕", value: "Chai over Coffee" },
      { label: "🥗", value: "Health-conscious eater" }
    ]
  },
  {
    title: "Sports & Activities",
    iconType: 'heart',
    items: [
      { label: "🏋🏽‍♂️", value: "Gym" },
      { label: "🏃‍♂️", value: "Runs on Wednesdays" },
    ]
  },
  {
    title: "Lifestyle",
    iconType: 'heart',
    items: [
      { label: "🌅", value: "Late riser" },
      { label: "🎵", value: "Rock and Metal" },
      { label: "🌍", value: "Travel enthusiast" }
    ]
  },
  {
    title: "Languages",
    iconType: 'languages',
    items: [
      { label: "Hindi", value: "Professional" },
      { label: "English", value: "Professional" },
      { label: "German", value: "Elementary" }
    ]
  }
];

export const profileImage = {
  src: "/personal/yash_loading_dp.jpg",
  alt: "Full body profile of Yash Yadav",
  width: 128,
  height: 192,
};
