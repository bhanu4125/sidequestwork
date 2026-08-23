"use client";

import React from "react";
import { Badge, RarityType } from "@/lib/skillsData";

interface BadgeStatsProps {
  badges: Badge[];
}

export default function BadgeStats({ badges }: BadgeStatsProps) {
  const totalBadges = badges.length;
  const earnedBadges = badges.filter((b) => b.status === "earned").length;
  const percentage = totalBadges > 0 ? Math.round((earnedBadges / totalBadges) * 100) : 0;

  // Group badges by rarity
  const rarities: RarityType[] = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"];

  const getRarityStats = (rarity: RarityType) => {
    const rarityBadges = badges.filter((b) => b.rarity === rarity);
    const total = rarityBadges.length;
    const earned = rarityBadges.filter((b) => b.status === "earned").length;
    return { total, earned, percent: total > 0 ? Math.round((earned / total) * 100) : 0 };
  };

  // Rarity color mappings for progress indicators
  const rarityColors: Record<RarityType, string> = {
    COMMON: "bg-slate-400 dark:bg-zinc-500",
    UNCOMMON: "bg-slate-500 dark:bg-slate-400",
    RARE: "bg-sky-500 dark:bg-sky-400",
    EPIC: "bg-amber-500 dark:bg-amber-400",
    LEGENDARY: "bg-teal-500 dark:bg-teal-400",
    MYTHIC: "bg-purple-500 dark:bg-purple-400",
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 dark:border-[#282828] dark:bg-[#161616]/40 min-h-[228px] md:h-[228px] flex flex-col justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-6 items-center">
        {/* Left: Overall Counter */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
            Collection Progress
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black leading-none text-slate-900 dark:text-white">{earnedBadges}</span>
            <span className="whitespace-nowrap text-xs text-slate-400 dark:text-zinc-500">/ {totalBadges} collected</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-[#3ecf8e]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Right: Rarity Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {rarities.map((rarity) => {
            const { total, earned, percent } = getRarityStats(rarity);

            return (
              <div key={rarity} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-slate-500 dark:text-zinc-400 truncate">{rarity}</span>
                  <span className="text-slate-400 dark:text-zinc-500">{earned}/{total}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
                  <div
                    className={`h-full rounded-full ${rarityColors[rarity]}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
