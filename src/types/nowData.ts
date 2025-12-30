export interface NowPlan {
  category: string;
  item: string;
  lastUpdated: string;
  link?: string;
}

export interface NowData {
  lastUpdated: string;
  currentPlans: NowPlan[];
}
