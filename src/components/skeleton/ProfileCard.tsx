interface ProfileCardSkeletonProps {
  showNIM?: boolean;
}

export default function ProfileCardSkeleton({
  showNIM,
}: ProfileCardSkeletonProps) {
  console.log("showNIM:", showNIM);
  return (
    <div className="flex flex-col sm:flex-row sm:gap-x-4 lg:flex-row lg:gap-x-6 gap-y-4">
      {/* Main Profile Content */}
      <div className="flex flex-row gap-x-3 sm:gap-x-4 lg:gap-x-6 flex-1">
        {/* Profile Image Skeleton */}
        <div className="rounded-md w-[120px] sm:w-[140px] lg:w-[184px] flex-shrink-0">
          <div className="w-full h-full bg-gray-200 rounded-md animate-pulse aspect-[4/5]"></div>
        </div>

        {/* Profile Info Skeleton */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 flex-1 min-w-0 flex flex-col justify-center">
          {/* Status Section */}
          <div className="space-y-1">
            <div className="h-2.5 sm:h-3 lg:h-4 bg-gray-200 rounded animate-pulse w-12 sm:w-14 lg:w-16"></div>
            <div className="h-3 sm:h-4 lg:h-5 bg-gray-200 rounded animate-pulse w-16 sm:w-20 lg:w-24"></div>
          </div>

          {/* Name Section */}
          <div className="space-y-1">
            <div className="h-2.5 sm:h-3 lg:h-4 bg-gray-200 rounded animate-pulse w-20 sm:w-24 lg:w-28"></div>
            <div className="h-3 sm:h-4 lg:h-5 bg-gray-200 rounded animate-pulse w-32 sm:w-40 lg:w-48"></div>
          </div>

          {/* NIM Section (conditionally shown) */}
          {showNIM && (
            <div className="space-y-1">
              <div className="h-2.5 sm:h-3 lg:h-4 bg-gray-200 rounded animate-pulse w-24 sm:w-28 lg:w-32"></div>
              <div className="h-3 sm:h-4 lg:h-5 bg-gray-200 rounded animate-pulse w-20 sm:w-24 lg:w-28"></div>
            </div>
          )}

          {/* Email Section */}
          <div className="space-y-1">
            <div className="h-2.5 sm:h-3 lg:h-4 bg-gray-200 rounded animate-pulse w-8 sm:w-10 lg:w-12"></div>
            <div className="h-3 sm:h-4 lg:h-5 bg-gray-200 rounded animate-pulse w-40 sm:w-48 lg:w-56"></div>
          </div>
        </div>
      </div>

      {/* Change Password Button Skeleton - Desktop */}
      <div className="hidden lg:flex lg:items-start lg:justify-end">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-32 px-6 py-2"></div>
      </div>
    </div>
  );
}
