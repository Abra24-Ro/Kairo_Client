import type { TaskStatus } from "@/types";
import { TaskActivity } from "./TaskActivity";

import { getStatusDotColor } from "@/utils/status.utils";
import { formatterDate } from "@/utils/formatterDate";
import { getDateFromObjectId } from "@/utils/objectId.utils";

type ActivityTimelineProps = {
  activities: Array<{
    _id: string;
    user: { name: string; email: string; _id: string };
    status: TaskStatus;
  }>;
};

export const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  const isLastActivity = (index: number) => index === activities.length - 1;

  return (
    <div className="relative space-y-0">
      {activities.map((item, index) => {
        const dotColorClass = getStatusDotColor(item.status);
        const changeDate = getDateFromObjectId(item._id);
        const showLine = !isLastActivity(index);

        return (
          <div key={item._id} className="relative pl-5 pb-5 last:pb-0">
            {/* Vertical line */}
            {showLine && (
              <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-gray-200" />
            )}

            {/* Dot with status color */}
            <div
              className={`absolute left-0 top-2 h-4 w-4 rounded-full ${dotColorClass}`}
            />

            {/* Content */}
            <div>
              <p className="text-xs text-gray-400 mb-2">
                {formatterDate(changeDate.toISOString())}
              </p>
              <TaskActivity completedBy={item.user.name} status={item.status} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
