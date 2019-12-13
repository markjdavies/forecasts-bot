import { ContextMessageUpdate } from "telegraf";
import * as sql from "mssql";

export interface Player {
  playerId: number;
  userName: string;
  displayName: string;
  team: string;
}

export interface ForecastsContext extends ContextMessageUpdate {
  dbConfig?: sql.config;
  player?: Player;
}
