export const defaultPlans = [
  {
    name: "Small Bin",
    subtitle: "32 Gallon Trash",
    price: "2,500",
    features: ["Holds 2 Trash Bags", "1-2 People", "18kg Max", "Every Day"],
  },
  {
    name: "Medium Bin",
    subtitle: "64 Gallon Trash",
    price: "3,500",
    features: [
      "Holds 4 Trash Bags",
      "3-4 People",
      "36kg Max",
      "Every Other Day",
    ],
  },
  {
    name: "Large Bin",
    subtitle: "96 Gallon Trash",
    price: "4,500",
    features: ["Holds 6 Trash Bags", "5-6 People", "54kg Max", "Once a Week"],
  },
  {
    name: "General Waste Collection",
    subtitle: "Standard Collection",
    price: "2,000",
    features: [
      "Standard Bins",
      "Residential Areas",
      "Mixed Waste",
      "Weekly Pickup",
    ],
  },
  {
    name: "Recycling Program",
    subtitle: "Eco-Friendly",
    price: "1,500",
    features: [
      "Recyclables Only",
      "Sorting Bins",
      "Monthly Reports",
      "Bi-weekly Pickup",
    ],
  },
  {
    name: "Organic Composting",
    subtitle: "Green Waste",
    price: "1,000",
    features: [
      "Food Scraps",
      "Garden Waste",
      "Compost Returns",
      "Weekly Pickup",
    ],
  },
];

export function getPlans() {
  try {
    const stored = localStorage.getItem("ecollect_plans_v2");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return defaultPlans;
}

export function savePlans(plans: any[]) {
  localStorage.setItem("ecollect_plans_v2", JSON.stringify(plans));
}
