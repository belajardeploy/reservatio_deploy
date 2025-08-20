import React from "react";

const TableSkeletonAdm: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="animate-pulse">
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="border-b-2 py-1.5 border-b-neutral-4 m-0"
        >
          <div className="px-4">
            <div className="grid grid-cols-7 text-xs gap-x-2 py-2"> {/* py-2 to match row height */}
              {[...Array(7)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="col-span-1 h-5 bg-neutral-4/20 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeletonAdm;