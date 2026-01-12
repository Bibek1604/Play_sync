export interface CreateGameDTO {
  name: string;
  image: string;
  categoryId: string;

  gameType: "online" | "offline";
  gameMode: "solo" | "1v1" | "multiplayer" | "tournament";

  requiredPlayers: number;
  location?: string;

  pricingType: "free" | "paid";
  price?: number;
}

export interface UpdateGameDTO {
  name?: string;
  image?: string;
  location?: string;
  status?: "open" | "full" | "started" | "ended";
}
