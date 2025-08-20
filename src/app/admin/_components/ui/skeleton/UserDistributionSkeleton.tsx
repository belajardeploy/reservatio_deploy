// Komponen Skeleton untuk card distribusi pengguna
const UserDistributionCardSkeleton = () => (
  <div className="flex gap-2">
    {/* Active Users Card Skeleton */}
    <div className="border-2 rounded-lg px-4 py-3 flex gap-x-2 items-center flex-1">
      <div className="size-11 p-2 rounded-lg bg-green-2/10 animate-pulse" />
      <div className="space-y-2">
        <div className="h-6 w-20 bg-neutral-200 rounded animate-pulse" />
        <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse" />
      </div>
    </div>
    
    {/* Banned Users Card Skeleton */}
    <div className="border-2 rounded-lg px-4 py-3 flex gap-x-2 items-center flex-1">
      <div className="size-11 p-2 rounded-lg bg-red-2/10 animate-pulse" />
      <div className="space-y-2">
        <div className="h-6 w-20 bg-neutral-200 rounded animate-pulse" />
        <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default UserDistributionCardSkeleton;