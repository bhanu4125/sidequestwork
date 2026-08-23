"use client";

import React, { useState } from "react";
import { Badge as BadgeType } from "@/lib/skillsData";
import Badge from "./Badge";
import BadgeStats from "./BadgeStats";
import BadgeDetailModal from "./BadgeDetailModal";

interface BadgeGridProps {
  badges: BadgeType[];
  unfilteredBadges?: BadgeType[];
}

export default function BadgeGrid({ badges, unfilteredBadges }: BadgeGridProps) {
  // Selected badge for details modal
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);

  const statsBadges = unfilteredBadges || badges;

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Statistics Bar */}
      <BadgeStats badges={statsBadges} />

      {/* Badge Grid Gallery */}
      <div className="flex-1 pt-2">
        {badges.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4">
            {badges.map((badge) => (
              <Badge
                key={badge.id}
                badge={badge}
                onClick={(b) => setSelectedBadge(b)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-[#1a1a1a]/30 h-full">
            <p className="text-sm font-semibold text-slate-400 dark:text-zinc-500">
              No badges found
            </p>
          </div>
        )}
      </div>

      {/* Details Popup Modal */}
      {selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </div>
  );
}

